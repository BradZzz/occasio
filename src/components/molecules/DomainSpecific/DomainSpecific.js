// @flow
import React, { Component, PropTypes } from "react"
import { connect } from "react-redux"
import { BackButton } from "../../../components/molecules/"
import styles from "./styles.css"
import * as WhoisActions from "../../../actions/whois"

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
      specific: props.specific,
      specObj: props.specObj,
      metaApp: props.metaApp,
    }
  }

  genEmpty = () => {
    let pulled = {}
    for (var x in appKys) {
      pulled[appKys[x]] = ""
    }
    return pulled
  }

  formatMeta = (specific, meta) => {
    if (meta !== undefined){
      const met = meta.filter(( entry ) => {
        if ('name' in entry && entry.name === specific){
          return true
        }
        return false
      })
      if (met.length > 0) {
        const meat = JSON.parse(JSON.parse(met[0].meta)).results.appraisal
        console.log("Meat")
        console.log(meat)
        const copy = this.genCopy(meat)
        return copy
      } else {
        return this.genEmpty()
      }
    } else {
      return this.genEmpty()
    }
  }

  genCopy = (met) => {
    let pulled = {}
    for (var x in appKys){
      pulled[appKys[x]] = ""
      if (appKys[x] in met) {
        let data = met[appKys[x]]
        if ( convKys.indexOf(appKys[x]) > -1 ) {
          data = JSON.stringify(data)
        }
        pulled[appKys[x]] = data
      }
    }
    return pulled
  }

  componentWillReceiveProps(nextProps) {
    if(JSON.stringify(this.state.specific) !== JSON.stringify(nextProps.specific))
    {
      this.setState({ specific: nextProps.specific })
    }
    if(JSON.stringify(this.state.specObj) !== JSON.stringify(nextProps.specObj))
    {
      this.setState({ specObj: nextProps.specObj })
    }
    if(JSON.stringify(this.state.metaApp) !== JSON.stringify(nextProps.metaApp))
    {
      this.setState({ metaApp: nextProps.metaApp })
    }
  }

  renderKey = (dom, idx) => {
    return (
      <div key={ idx }>
        <span>{ dom }</span>
      </div>
    )
  }

  render() {
    const { specific, specObj, metaApp } = this.state
    const sObj = JSON.parse(specObj)
    let pulled = this.formatMeta( specific, metaApp )
    return (
      <div className={ styles.root }>
        <h1>{ specific }</h1>
        <div style={{ "width": "220px", "border" : "1px solid black", "margin" : "1em", "padding" : "1em" }}>
          <div style={{ display: pulled['appraised_value'] ? 'block' : 'none' }}>Appraised Value: { pulled['appraised_value'] }</div>
          <div style={{ display: pulled['appraised_wholesale_value'] ? 'block' : 'none' }}>Wholesale Value: { pulled['appraised_wholesale_value'] }</div>
        </div>
        { Object.keys(sObj).map(function(s){ return sObj[s] }).map(this.renderKey) }
        <div style={{ "overflowY" : "auto", "height" : "300px", "margin" : "1em 0", "overflowWrap" : "break-word" }}>
          { appKys.map((key,idx) => <span key={ idx } className={ styles.appraisal }>{ key }: { pulled[key] }</span>) }
        </div>
        <BackButton redirect="domain" style={ buttonStyle }>Back</BackButton>
      </div>
    )
  }
}

DomainSpecific.propTypes = {
  specific: PropTypes.string.isRequired,
  metaApp: PropTypes.array.isRequired,
  specObj: PropTypes.string.isRequired,
}

function mapStateToProps(state) {
  const { specific, specObj, metaApp } = state.domain
  return {
    specific,
    specObj,
    metaApp,
  }
}

export default connect(mapStateToProps)(DomainSpecific)