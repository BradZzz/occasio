// @flow
import React, { Component, PropTypes } from "react"
import { connect } from "react-redux"
import { browserHistory } from 'react-router'
import styles from "./styles.css"

import { DoublePiePanel } from "../../../components/molecules"
import { LineChart } from "../../../components/quarks"
import { LINE_CHART_TEST, POS_TAGS } from "../../../constants/application"
import { Card } from 'material-ui/Card';

const POL_ACCEPT = [-.3,.3]
const SUB_ACCEPT = [.3,.7]

export class BookPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      book: props.book,
      bookComp: props.bookComp,
      dataSearch: props.dataSearch,
      dataSearchComp: props.dataSearchComp,
      isFetchingSearch: props.isFetchingSearch,
      isFetchingSummary: props.isFetchingSummary,
      isFetchingList: props.isFetchingList
    }
  }

  componentWillReceiveProps(nextProps) {
    if(JSON.stringify(this.state.book) !== JSON.stringify(nextProps.book))
    {
      this.setState({ book: nextProps.book })
    }
    if(JSON.stringify(this.state.bookComp) !== JSON.stringify(nextProps.bookComp))
    {
      this.setState({ bookComp: nextProps.bookComp })
    }
    if(JSON.stringify(this.state.dataSearch) !== JSON.stringify(nextProps.dataSearch))
    {
      this.setState({ dataSearch: nextProps.dataSearch })
    }
    if(JSON.stringify(this.state.dataSearchComp) !== JSON.stringify(nextProps.dataSearchComp))
    {
      this.setState({ dataSearchComp: nextProps.dataSearchComp })
    }
    if(JSON.stringify(this.state.isFetchingSearch) !== JSON.stringify(nextProps.isFetchingSearch))
    {
      this.setState({ isFetchingSearch: nextProps.isFetchingSearch })
    }
    if(JSON.stringify(this.state.isFetchingSummary) !== JSON.stringify(nextProps.isFetchingSummary))
    {
      this.setState({ isFetchingSummary: nextProps.isFetchingSummary })
    }
    if(JSON.stringify(this.state.isFetchingList) !== JSON.stringify(nextProps.isFetchingList))
    {
      this.setState({ isFetchingList: nextProps.isFetchingList })
    }
  }

  retColor(key) {
    const colors = ['#f44336','#9c27b0','#3f51b5','#00bcd4','#4caf50','#ffc107','#ff5722']
    let storedKey = 'Other'
    let storedColor = colors[0]
    if (key.includes('NN')) {
      storedKey = 'NN'
      storedColor = colors[1]
    } else if (key.includes('VB')) {
      storedKey = 'VB'
      storedColor = colors[2]
    } else if (key.includes('PRP')) {
      storedKey = 'PRP'
      storedColor = colors[3]
    } else if (key.includes('JJ')) {
      storedKey = 'JJ'
      storedColor = colors[4]
    } else if (key.includes('RB')) {
      storedKey = 'RB'
      storedColor = colors[5]
    }

    return [storedKey, storedColor]
  }

  sortString(a, b) {
    var nameA = a.color.toUpperCase(); // ignore upper and lowercase
    var nameB = b.color.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1
    }
    if (nameA > nameB) {
      return 1
    }
    return 0
  }

  sortArrayObjs(arr){
    const items = Object.keys(arr).map(function(key) {
        return [key, arr[key]];
    })
    items.sort(function(first, second) {
        return second[1] - first[1];
    })
    return items
  }

  getBookIndex(book) {
    const { dataSummary } = this.props
    return dataSummary['books'].indexOf(book.replace('(analysis).json',''))
  }

  getCosineSim(index) {
    const { dataList, dataSummary } = this.props
    let cosineSim = {}
    for(let x = 0; x < dataList.length; x++){
      if (x !== index) {
        cosineSim[dataList[x].replace('(analysis).json','')] = dataSummary['word_similarity'][index][x]
      }
    }
    return cosineSim
  }

  getObjCopy(obj) {
    return JSON.parse(JSON.stringify(obj))
  }

  constructConfig(search) {
    let allKeys = []
    const combinedKeys = {}
    let combKeysAll = []
    let total = 0
    for (let key in search["tags"]){
      const colorConf = this.retColor(key)
      if (!(colorConf[0] in combinedKeys)){
        combinedKeys[colorConf[0]] = 0
      }
      const val = search["tags"][key]
      combinedKeys[colorConf[0]] += val
      allKeys.push({name: key, y: val, color: colorConf[1]})
      total+= val
    }
    total = parseFloat(total)
    for (let key in combinedKeys){
      const colorConf = this.retColor(key)
      const val = combinedKeys[key]
      combKeysAll.push({name: key, y: parseFloat(((val/total) * 100).toFixed(2)), color: colorConf[1]})
    }
    for (let val of allKeys){
      val.y = parseFloat(((val.y/total) * 100).toFixed(2))
    }

    allKeys = allKeys.sort(this.sortString)

    combKeysAll = combKeysAll.sort(this.sortString)

    return [{
       name: 'Browsers',
       data: combKeysAll,
       size: '60%',
       dataLabels: {
           formatter: function () {
               return this.y > 5 ? this.point.name : null;
           },
           color: '#ffffff',
           distance: -30
       }
    }, {
       name: 'Versions',
       data: allKeys,
       size: '80%',
       innerSize: '60%',
       dataLabels: {
           formatter: function () {
               // display only if larger than 1
               return this.y > 1 ? '<b>' + this.point.name + ':</b> ' +
                   this.y + '%' : null;
           }
       },
       id: 'versions'
    }]
  }

  render() {
    const { dataList, dataSummary } = this.props
    const { book, bookComp, dataSearch, dataSearchComp, isFetchingSearch, isFetchingList, isFetchingSummary } = this.state

    let bView = <span></span>

    if (book && !isFetchingSearch && !isFetchingSummary && !isFetchingList) {
      const bIndex = this.getBookIndex(book)
      let cosineSim = this.getCosineSim(bIndex)
      cosineSim = this.sortArrayObjs(cosineSim)
      let defWords = this.sortArrayObjs(dataSummary['defining_words'][bIndex])
      let thumb = ""
      if ("imageLinks" in dataSearch["oMeta"] && "thumbnail" in dataSearch["oMeta"]["imageLinks"]){
        thumb = dataSearch["oMeta"]["imageLinks"]["thumbnail"]
      }
      const meta = {
        book: book.split('_')[0],
        author: book.split('_')[1].split('(')[0],
        description: dataSearch["oMeta"]["description"] ? dataSearch["oMeta"]["description"] : "*No Description*",
        maturity: dataSearch["oMeta"]["maturityRating"],
        thumb: thumb,
        readLink: dataSearch["oMeta"]["previewLink"],
        cat: dataSearch["oMeta"]["categories"],
        defWords: defWords,
        cosineSim: cosineSim
      }

      const pol_data = JSON.parse(JSON.stringify(LINE_CHART_TEST))
      const sub_data = JSON.parse(JSON.stringify(LINE_CHART_TEST))

      pol_data.series[0].name = "Book A"
      pol_data.series[0].data = dataSearch["pol"].map((pol) => {
        return pol > POL_ACCEPT[1] ? 1 : (pol < POL_ACCEPT[0] ? -1 : 0)
      })
      pol_data.series[0].color = "#000000"

      pol_data.yAxis.min = -1
      pol_data.yAxis.max = 1

      sub_data.series[0].name = "Book A"
      sub_data.series[0].data = dataSearch["sub"].map((sub) => {
        return sub > SUB_ACCEPT[1] ? 1 : (sub < SUB_ACCEPT[0] ? -1 : 0)
      })
      sub_data.series[0].color = "#000000"

      sub_data.yAxis.min = -1
      sub_data.yAxis.max = 1

      const config = this.constructConfig(dataSearch)
      let dpView = (<DoublePiePanel title="Semantic Analysis" data={config} dataComp={ null } sub={''} width={800}
              height={600} nav={ { data: POS_TAGS, key: "pos", val: "desc" } }/>)
      let defWordView = (<div style={{ display: 'flex', "marginLeft": "1em" }}>
         <div style={{ width: '25%' }}>
           { meta.defWords.slice(0, 5).map((itm, idx) => { return <div key={idx}>{ itm[0] + ": " + (100 * parseFloat(itm[1])).toFixed(2) + "%" }</div> })}
         </div>
         <div style={{ width: '25%' }}>
           { meta.defWords.slice(5, 10).map((itm, idx) => { return <div key={idx}>{ itm[0] + ": " + (100 * parseFloat(itm[1])).toFixed(2) + "%" }</div> })}
         </div>
         <div style={{ width: '25%' }}>
           { meta.defWords.slice(10, 15).map((itm, idx) => { return <div key={idx}>{ itm[0] + ": " + (100 * parseFloat(itm[1])).toFixed(2) + "%" }</div> })}
         </div>
         <div style={{ width: '25%' }}>
           { meta.defWords.slice(15, 20).map((itm, idx) => { return <div key={idx}>{ itm[0] + ": " + (100 * parseFloat(itm[1])).toFixed(2) + "%" }</div> })}
         </div>
       </div>)
      let cosView = (<div style={{ "marginLeft": "1em" }}>
         { meta.cosineSim.slice(0, 10).map((itm, idx) => { return <div key={idx}>{ "(" + (100 * parseFloat(itm[1])).toFixed(2) + "%) " + itm[0] }</div> })}
      </div>)

      if (bookComp && "pol" in dataSearchComp && "sub" in dataSearchComp) {
        const bIndexComp = this.getBookIndex(bookComp)
        let cosineSimComp = this.sortArrayObjs(this.getCosineSim(bIndexComp))
        let defWordsComp = this.sortArrayObjs(dataSummary['defining_words'][bIndexComp])

        if (pol_data.series.length === 1) {
          pol_data.series.push(this.getObjCopy(pol_data.series[0]))
        }
        pol_data.series[1].name = "Book B"
        pol_data.series[1].data = dataSearchComp["pol"].map((pol) => {
          return pol > POL_ACCEPT[1] ? 1 : (pol < POL_ACCEPT[0] ? -1 : 0)
        })
        pol_data.series[1].color = "#d32f2f"

        if (sub_data.series.length === 1) {
          sub_data.series.push(this.getObjCopy(sub_data.series[0]))
        }
        sub_data.series[1].name = "Book B"
        sub_data.series[1].data = dataSearchComp["sub"].map((sub) => {
          return sub > SUB_ACCEPT[1] ? 1 : (sub < SUB_ACCEPT[0] ? -1 : 0)
        })
        sub_data.series[1].color = "#d32f2f"

        const configComp = this.constructConfig(dataSearchComp)
        defWordView = (<div style={{ display: 'flex', "marginLeft": "1em" }}>
           <div style={{ width: '25%' }}>
             { meta.defWords.slice(0, 5).map((itm, idx) => { return <div key={idx}>{ itm[0] + ": " + (100 * parseFloat(itm[1])).toFixed(2) + "%" }</div> })}
           </div>
           <div style={{ width: '25%' }}>
             { meta.defWords.slice(5, 10).map((itm, idx) => { return <div key={idx}>{ itm[0] + ": " + (100 * parseFloat(itm[1])).toFixed(2) + "%" }</div> })}
           </div>
           <div style={{ width: '25%' }}>
             { defWordsComp.slice(0, 5).map((itm, idx) => { return <div key={idx} className={ styles.bookAlt }>{ itm[0] + ": " + (100 * parseFloat(itm[1])).toFixed(2) + "%" }</div> })}
           </div>
           <div style={{ width: '25%' }}>
             { defWordsComp.slice(5, 10).map((itm, idx) => { return <div key={idx} className={ styles.bookAlt }>{ itm[0] + ": " + (100 * parseFloat(itm[1])).toFixed(2) + "%" }</div> })}
           </div>
         </div>)
        cosView = (<div style={{ "marginLeft": "1em", display: "flex" }}>
           <div style={{ width: "50%" }}>
            { meta.cosineSim.slice(0, 10).map((itm, idx) => { return <div key={idx}>{ "(" + (100 * parseFloat(itm[1])).toFixed(2) + "%) " + itm[0] }</div> })}
           </div>
           <div style={{ width: "50%" }}>
            { cosineSimComp.slice(0, 10).map((itm, idx) => { return <div key={idx} className={ styles.bookAlt }>{ "(" + (100 * parseFloat(itm[1])).toFixed(2) + "%) " + itm[0] }</div> })}
           </div>
        </div>)
        dpView = (<DoublePiePanel title="Semantic Analysis" data={config} dataComp={ configComp } sub={''} width={500}
                height={400} nav={ { data: POS_TAGS, key: "pos", val: "desc" } }/>)
      }

      bView = (
      <div>
        <Card style={{ width : "100%", "marginBottom": "1em", padding: "1em" }}>
          <div style={{ display: "flex" }}>
            <div style={{ "marginTop": "1em" }}>
              <a href={meta.readLink} target="_blank">
                <img src={meta.thumb}/>
              </a>
            </div>
            <div style={{ margin:"1em" }}>
              {meta.description + " (" + meta.cat + ") "}
            </div>
          </div>
        </Card>
        <Card style={{ "margin":"1em 0", "padding":"1em"}}>
          <h3 style={{ textAlign: "center" }}>Defining Words</h3>
          { defWordView }
        </Card>
        <Card style={{ "margin":"1em 0", "padding":"1em"}}>
          <h3 style={{ textAlign: "center" }}>Similar Books</h3>
          { cosView }
        </Card>
        <Card style={{ "margin":"1em 0", "padding":"1em"}}>
          <div style={{ width : "100%", display: "flex" }}>
            <div style={{ width : "50%" }}>
              <h3 style={{ textAlign: "center" }}>{ "Polarity Analysis" }</h3>
              <LineChart data={ pol_data } width={ 500 } height={ 300 } />
            </div>
            <div style={{ width : "50%" }}>
              <h3 style={{ textAlign: "center" }}>{ "Subjectivity Analysis" }</h3>
              <LineChart data={ sub_data } width={ 500 } height={ 300 }/>
            </div>
          </div>
        </Card>
        { dpView }
      </div>
      )
    }

    return (
      <div className={styles.root}>
        { bView }
      </div>
    )
  }
}

BookPanel.propTypes = {
  book: PropTypes.string.isRequired,
  bookComp: PropTypes.string.isRequired,
  dataList: PropTypes.array.isRequired,
  isFetchingList: PropTypes.bool.isRequired,
  dataSearch: PropTypes.object.isRequired,
  isFetchingSearch: PropTypes.bool.isRequired,
  dataSummary: PropTypes.object.isRequired,
  isFetchingSummary: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { book, bookComp, dataList, isFetchingList, dataSearch, dataSearchComp, isFetchingSearch, dataSummary, isFetchingSummary } = state.books
  return { book, bookComp, dataList, isFetchingList, dataSearch, dataSearchComp, isFetchingSearch, dataSummary, isFetchingSummary }
}

export default connect(mapStateToProps)(BookPanel)