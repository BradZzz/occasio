// @flow
import React, { Component, PropTypes } from "react"
import { connect } from "react-redux"
import { BackButton } from "../../../components/molecules/"
import styles from "./styles.css"
import * as WhoisActions from "../../../actions/whois"
import * as Chart from "react-chartjs"
const LineChart = Chart.Line
const options = {
  scaleShowGridLines : false,
  scaleShowLabels: false,
  scaleFontSize: 0,
}

const buttonStyle = { }
const appKys = ['appraised_value','appraised_wholesale_value','overture_sld','language','category','alexa_link_popularity','alexa_rank',
'appraised_monetization_value', 'overture_term', 'using_previous_sales_data', 'using_sld', 'word_tracker_sld', 'trending', 'traffic_estimate',
'appraised_ignore_tm_value','search_results_phrase','search_ads','search_suggestion_phrase', 'search_results_sld', 'search_ads_sld',
'search_suggestion_sld', 'search_results_tld', 'google_site_index', 'fast_appraisal', 'using_previous_sales_data', 'pagerank',
'pagerank_real', 'traffic_estimate', 'overture_tld', 'overture_sld', 'overture_term', 'word_tracker_sld', 'word_tracker_term',
'alexa_rank', 'alexa_link_popularity', 'dmoz_listed', 'is_adult', 'udrp', 'registrant_name', 'registrant_email', 'avg_sales_price',
'similar_sales','keyword_stats','keyword_stats_ng','sales_history']
const convKys = ['keyword_stats','keyword_stats_ng','sales_history', 'search_suggestion_phrase', 'search_suggestion_sld',
'registrant_name','registrant_email','similar_sales']

export class DomainSpecific extends Component {
  constructor(props) {
    super(props)
    this.state = {
      specObj: props.specObj
    }
  }

  componentWillReceiveProps(nextProps) {
    if(JSON.stringify(this.state.specObj) !== JSON.stringify(nextProps.specObj))
    {
      console.log("Spec Changed!")
      console.log(nextProps.specObj)
      this.setState({ specObj: nextProps.specObj })

    }
  }

  info = (title, dom, keys) => {
    return <div style={{ "width": "300px", "height" : "400px", "display" : "inline-block" }}>
             <h3>{ title }</h3>
             <div style={{ "height": "60%", "overflowY" : "auto", "border" : "1px solid #000", "padding" : "1em" }}>
               { dom }
             </div>
             <div style={{ "height": "40%", "overflowY" : "auto", "border" : "1px solid #000", "padding" : "1em" }}>
              { keys }
             </div>
           </div>
  }

  genChartData = (keyword) => {
    const x = []
    const y = []
    console.log("keyword")
    console.log(keyword)
    const parts = keyword.trends.split(",")
    for (var pnt in parts) {
      if (parts[pnt]) {
        const formatted = parts[pnt].replace("{","").replace("}","").split(":")
        x.push(formatted[1] + "/" + formatted[0].replace("20",""))
        y.push(parseInt(formatted[2]))
      }
    }
    console.log(y)
    return {
      labels: x,
      datasets: [{
        fillColor: keyword.type === 'exact' ? "rgba(83,109,254,0.2)" : "rgba(211,47,47,0.2)",
        strokeColor: keyword.type === 'exact' ? "rgba(83,109,254,1)" : "rgba(211,47,47,1)",
        pointColor: keyword.type === 'exact' ? "rgba(83,109,254,1)" : "rgba(211,47,47,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: keyword.type === 'exact' ? "rgba(83,109,254,1)" : "rgba(211,47,47,1)",
        data: y
      }],
    }
  }

  renderKey = (dom, idx) => {
    return (
      <div key={ idx }>
        <span>{ dom }</span>
      </div>
    )
  }

  renderChart = (dat, idx) => {
    const data = this.genChartData(dat)
    console.log("renderChart")
    console.log(data)
    return <div key={idx} style={{ "width" : "45%", "display" : "block", "float" : "left" }}>
             <h3>Search Stats ( { dat.type } )</h3>
             <LineChart key={idx} data={ data } options={ options } width="450" height="250"
                style={{ "backgroundColor" : "rgba(0,0,0,.05)", "borderRadius" : "8px" }} redraw />
           </div>
  }

  render() {
    const { specObj } = this.state
    console.log(specObj)
    if (specObj !== undefined && 'name' in JSON.parse(specObj)){
      const sObj = JSON.parse(specObj)
      console.log(sObj)
      const pulled = sObj.meta
      console.log( pulled )
      let sold = []
      if ('sales_history' in pulled && 'sold' in pulled['sales_history'] && pulled.sales_history.sold.length > 0) {
        sold = pulled.sales_history.sold
      }
      let keywords = []
      if ('keyword_stats' in pulled && 'search' in pulled['keyword_stats'] && pulled.keyword_stats.search.length > 0) {
        keywords = pulled.keyword_stats.search
      }
      const keyList = ['language','category','search_results_phrase','pagerank','traffic_estimate','overture_term','word_tracker_term','alexa_rank','alexa_link_popularity']
//      let chart = <div></div>
//      if ('keyword_stats_ng' in pulled && 'search' in pulled['keyword_stats_ng'] && pulled.keyword_stats_ng.search.length > 0) {
//        chart = pulled.keyword_stats_ng.search.map(this.renderChart)
//      }
      return (
        <div className={ styles.root }>
          <BackButton redirect="domain" style={ buttonStyle }>Back</BackButton>
          <div style={{ "display" : "flex" }}>
            <h1 style={{ "float" : "left", "marginRight" : "2em" }}>{ sObj.name }</h1>
            <div style={{ "float" : "left", "marginTop" : "1.3em" }}>
              <div style={{ "display" : 'block' }}>Appraised Value: ${ pulled['appraised_value'] }.00</div>
              <div style={{ "display" : 'block' }}>Wholesale Value: ${ pulled['appraised_wholesale_value'] }.00</div>
            </div>
          </div>
          <div style={{ "display" : "block", "padding" : "1em", "marginBottom" : ".5em" }}>
            { pulled.keyword_stats_ng.search.map(this.renderChart) }
          </div>
          { this.info('Related Sales',sold.map((sale, idx) => <div key={ idx }>{ sale.source + " : " + sale.domain + " : " + sale.price + " : " + sale.date }</div>),
            ['source','domain','price','date'].map((key, idx) => <div key={ idx }>{ key }</div>)) }
          { this.info('Keywords',keywords.map((keyword, idx) => <div key={ idx }>{ keyword.keyword + " : " + keyword.avg_search_volume +
            " : " + keyword.local_search_volume + " : " + keyword.type + " : " + keyword.avg_competition }</div>),
            ['keyword','avg_search_volume','local_search_volume','type','avg_competition'].map((key, idx) => <div key={ idx }>{ key }</div>)) }
          { this.info('Misc',keyList.map((key, idx) => <div key={ idx }>{ key + " : " + pulled[key] }</div>),
            keyList.map((key, idx) => <div key={ idx }>{ key }</div>)) }
        </div>
      )
    } else {
      return <div>error</div>
    }
  }
}

DomainSpecific.propTypes = {
  specObj: PropTypes.string,
}

function mapStateToProps(state) {
  const { specObj } = state.domain
  return {
    specObj,
  }
}

export default connect(mapStateToProps)(DomainSpecific)