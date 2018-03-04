import React, {Component} from 'react'

class Star extends Component {
    state = {
        rating: this.props.storage,
    };

    /**
     * description: rate for each book
     * @param rate
     * @param div
     */
    rating = (rate, div)=>{
        div.childNodes.forEach(function (item) {
            let index = parseInt(item.getAttribute('data-index'), 10) + 1;
            if(index <= rate){
                item.setAttribute('class', 'star starStyle');
            }else if(item.getAttribute('class') !== 'rate'){
                item.setAttribute('class', 'star')
            }
        });
    };

    /**
     * description: get the score of each book from localStorage
     */
    componentDidMount(){
        let score = this.state.rating;
        if(score >0 ){
            this.rating(score, this.refs.renderResult);
        }
    }

    /**
     * description: update the score of each when click the different circles
     * @param value
     */
    updateStar = (value)=>{
        this.setState({rating: parseInt(value)+1});
        /*不能在这里用console验证，因为console会先执行，打印出上一次rating的值*/

        let newKey = this.props.renderId.toString();
        localStorage.setItem(newKey, (parseInt(value)+1).toString());
    };

    render(){
        let score = this.state.rating;
        let className = this.props.renderId;
        if(score !== this.props.storage){
            this.rating(score, this.refs.renderResult)
        }

        return(
            <div className={className}
                 ref={"renderResult"}
                 onClick={(e)=>this.updateStar(e.target.getAttribute('data-index'))}
            >
                <i data-index="0" className="star"></i>
                <i data-index="1" className="star"></i>
                <i data-index="2" className="star"></i>
                <i data-index="3" className="star"></i>
                <i data-index="4" className="star"></i>
                <span className="rate">{this.state.rating ? this.state.rating:0}</span>
            </div>
        )
    }
}

export default Star