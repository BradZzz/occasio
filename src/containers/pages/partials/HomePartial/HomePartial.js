// @flow
import React, { Component, PropTypes } from "react"
import { connect } from "react-redux"
import styles from "./styles.css"

import * as BookActions from "../../../../actions/books"

import { FoldingCubeHome } from "../../../../components/atoms"
import { DoublePiePanel } from "../../../../components/molecules"
import { LineChart } from "../../../../components/quarks"

import { LINE_CHART_TEST } from "../../../../constants/application"

import { Card } from 'material-ui/Card';

import Divider from 'material-ui/Divider';

const POL_ACCEPT = [-.3,.3]
const SUB_ACCEPT = [.3,.7]

export class HomePartial extends Component {
  constructor(props) {
    super(props)
    this.state = {
      book: props.book,
      dataSearch: props.dataSearch,
      isFetchingSearch: props.isFetchingSearch
    }
  }

  componentWillReceiveProps(nextProps) {
    if(JSON.stringify(this.state.book) !== JSON.stringify(nextProps.book))
    {
      this.setState({ book: nextProps.book })
    }
    if(JSON.stringify(this.state.dataSearch) !== JSON.stringify(nextProps.dataSearch))
    {
      this.setState({ dataSearch: nextProps.dataSearch })
    }
    if(JSON.stringify(this.state.isFetchingSearch) !== JSON.stringify(nextProps.isFetchingSearch))
    {
      this.setState({ isFetchingSearch: nextProps.isFetchingSearch })
    }
  }

  componentDidMount() {
    const { dispatch, dataList } = this.props
    if (dataList.length === 0) {
      dispatch(BookActions.queryListBooks())
      dispatch(BookActions.querySummaryBooks())
    }
  }

  action = (part) => {
    const { dispatch } = this.props
    console.log(part)
    dispatch( BookActions.querySearchBooks({ book: part }) )
  }

  list = (part,idx) => {
    const base = part.split('_')
    return (<div key={ idx } className={styles.parent} onClick={() => { this.action(part) } } style={{ cursor: "pointer" }}>
        <div className={styles.container}>
          <span className={styles.item}>{base[0] + " - " + base[1].replace("(analysis).json","")}</span>
        </div>
        <Divider />
    </div>)
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

  render() {
    const { dataList, dataSummary } = this.props
    const { book, dataSearch, isFetchingSearch } = this.state

    let bView = dataList.map(this.list)

    if (book && !isFetchingSearch){

      console.log('dataSummary', dataSummary)

      const bIndex = dataSummary['books'].indexOf(book.replace('(analysis).json',''))
      console.log('bIndex', bIndex)
      let cosineSim = {}
      for(let x = 0; x < dataList.length; x++){
        if (x !== bIndex) {
          cosineSim[dataList[x].replace('(analysis).json','')] = dataSummary['word_similarity'][bIndex][x]
        }
      }
      console.log('cosineSim', cosineSim)
      cosineSim = this.sortArrayObjs(cosineSim)
      let defWords = dataSummary['defining_words'][bIndex]
      console.log('defWords', defWords)
      defWords = this.sortArrayObjs(defWords)

      let counts = {};
      const words = dataSearch["words"]
      for (var i = 0; i < words.length; i++) {
          counts[words[i]] = 1 + (counts[words[i]] || 0)
      }

      const items = this.sortArrayObjs(counts)

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

      console.log(dataSearch)

      const pol_data = JSON.parse(JSON.stringify(LINE_CHART_TEST))
      const sub_data = JSON.parse(JSON.stringify(LINE_CHART_TEST))

      pol_data.series[0].name = "Polarity"
      pol_data.series[0].data = dataSearch["pol"].map((pol) => {
        return pol > POL_ACCEPT[1] ? 1 : (pol < POL_ACCEPT[0] ? -1 : 0)
      })
      pol_data.yAxis.min = -1
      pol_data.yAxis.max = 1


      sub_data.series[0].name = "Subjectivity"
      sub_data.series[0].data = dataSearch["sub"].map((sub) => {
        return sub > SUB_ACCEPT[1] ? 1 : (sub < SUB_ACCEPT[0] ? -1 : 0)
      })
      sub_data.yAxis.min = -1
      sub_data.yAxis.max = 1

      console.log("pol/sub", pol_data, sub_data)

      let allKeys = []
      const combinedKeys = {}
      let combKeysAll = []
      let total = 0
      for (let key in dataSearch["tags"]){
        const colorConf = this.retColor(key)
        if (!(colorConf[0] in combinedKeys)){
          combinedKeys[colorConf[0]] = 0
        }
        const val = dataSearch["tags"][key]
        combinedKeys[colorConf[0]] += val
        allKeys.push({name: key, y: val, color: colorConf[1]})
        total+= val
      }
      total = parseFloat(total)
      console.log("combined keys", combinedKeys, total)
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

      const config = [{
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
            <div style={{ display: 'flex', "marginLeft": "1em" }}>
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
            </div>
          </Card>
          <Card style={{ "margin":"1em 0", "padding":"1em"}}>
            <h3 style={{ textAlign: "center" }}>Similar Books</h3>
            <div style={{ "marginLeft": "1em" }}>
              { meta.cosineSim.slice(0, 10).map((itm, idx) => { return <div key={idx}>{ "(" + (100 * parseFloat(itm[1])).toFixed(2) + "%) " + itm[0] }</div> })}
            </div>
          </Card>
          <DoublePiePanel title="Semantic Analysis" data={config} sub={''} width={800} height={600}/>
          <Card style={{ "margin":"1em 0", "padding":"1em"}}>
            <div style={{ width : "100%", display: "flex" }}>
              <div style={{ width : "50%" }}>
                <h3 style={{ textAlign: "center" }}>{ "Polarity Analysis" }</h3>
                <LineChart data={ pol_data } width={ 500 } height={ 300 }/>
              </div>
              <div style={{ width : "50%" }}>
                <h3 style={{ textAlign: "center" }}>{ "Subjectivity Analysis" }</h3>
                <LineChart data={ sub_data } width={ 500 } height={ 300 }/>
              </div>
            </div>
          </Card>
        </div>
      )
    }

    return (
      <div className={styles.root}>
        <FoldingCubeHome/>
        <div style={{ "marginBottom":"5em" }}>
          { bView }
        </div>
      </div>
    )
  }
}

HomePartial.propTypes = {
  book: PropTypes.string.isRequired,
  dataList: PropTypes.array.isRequired,
  isFetchingList: PropTypes.bool.isRequired,
  dataSearch: PropTypes.object.isRequired,
  isFetchingSearch: PropTypes.bool.isRequired,
  dataSummary: PropTypes.object.isRequired,
  isFetchingSummary: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { book, dataList, isFetchingList, dataSearch, isFetchingSearch, dataSummary, isFetchingSummary } = state.books
  return { book, dataList, isFetchingList, dataSearch, isFetchingSearch, dataSummary, isFetchingSummary }
}

export default connect(mapStateToProps)(HomePartial)