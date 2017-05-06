// @flow
import React, { Component, PropTypes } from "react"
import { connect } from "react-redux"
import { BackButton } from "../../../components/molecules/"
import styles from "./styles.css"
import * as WhoisActions from "../../../actions/whois"
import * as Chart from "react-chartjs"
var LineChart = Chart.Line

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

//
//  genEmpty = () => {
//    let pulled = {}
//    for (var x in appKys) {
//      pulled[appKys[x]] = ""
//    }
//    return pulled
//  }
//
//  formatMeta = (specific, meta) => {
//    if (meta !== undefined){
//      const met = meta.filter(( entry ) => {
//        if ('name' in entry && entry.name === specific){
//          return true
//        }
//        return false
//      })
//      if (met.length > 0) {
//        const meat = JSON.parse(JSON.parse(met[0].meta)).results.appraisal
//        console.log("Meat")
//        console.log(meat)
//        const copy = this.genCopy(meat)
//        return copy
//      } else {
//        return this.genEmpty()
//      }
//    } else {
//      return this.genEmpty()
//    }
//  }
//
//  genCopy = (met) => {
//    let pulled = {}
//    for (var x in appKys){
//      pulled[appKys[x]] = ""
//      if (appKys[x] in met) {
//        let data = met[appKys[x]]
//        if ( convKys.indexOf(appKys[x]) > -1 ) {
//          data = JSON.stringify(data)
//        }
//        pulled[appKys[x]] = data
//      }
//    }
//    return pulled
//  }

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

  renderKey = (dom, idx) => {
    return (
      <div key={ idx }>
        <span>{ dom }</span>
      </div>
    )
  }

  render() {
    const { specObj } = this.state
    console.log(specObj)
    if (specObj !== undefined && 'name' in JSON.parse(specObj)){
      const sObj = JSON.parse(specObj)
      console.log(sObj)
      const pulled = sObj.meta
      console.log( pulled )

      const data = {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
          {
            label: "My First dataset",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [65, 59, 80, 81, 56, 55, 40],
            spanGaps: false,
          }
        ]
      }

      let sold = []
      if ('sales_history' in pulled && 'sold' in pulled['sales_history'] && pulled.sales_history.sold.length > 0) {
        sold = pulled.sales_history.sold
      }
      let keywords = []
      if ('keyword_stats' in pulled && 'search' in pulled['keyword_stats'] && pulled.keyword_stats.search.length > 0) {
        keywords = pulled.keyword_stats.search
      }
      const keyList = ['language','category','search_results_phrase','pagerank','traffic_estimate','overture_term','word_tracker_term','alexa_rank','alexa_link_popularity']
      return (
        <div className={ styles.root }>
          <BackButton redirect="domain" style={ buttonStyle }>Back</BackButton>
          <h1>{ sObj.name }</h1>
          <div style={{ "width" : "100%", "display" : "block" }}>
            <LineChart data={data} width="600" height="250"/>
          </div>
          {
            this.info('Appraisal',
            <div>
              <div style={{ display: pulled['appraised_value'] ? 'block' : 'none' }}>Appraised Value: ${ pulled['appraised_value'] }.00</div>
              <div style={{ display: pulled['appraised_wholesale_value'] ? 'block' : 'none' }}>Wholesale Value: ${ pulled['appraised_wholesale_value'] }.00</div>
            </div>,
            ['appraised_value','appraised_wholesale_value'].map((key, idx) => <div key={ idx }>{ key }</div>)
            )
          }
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