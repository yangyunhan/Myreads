import React, {Component} from 'react'

class Star extends Component {
    state = {
        rating: this.props.storage,
    };

    updateStar = (object,value)=>{
        this.setState({rating: parseInt(value)+1});
        /*不能在这里用console验证，因为console会先执行，打印出上一次rating的值*/
        let newKey = this.props.renderId.toString();
        localStorage.setItem(newKey, (parseInt(value)+1).toString());
        console.log(localStorage.getItem(newKey));
    };

    render(){
        //console.log(this.props.storage);
        let className = this.props.renderId;
        console.log(className);
        //console.log(this.state.rating);
        HTMLCollection.prototype.toArray = function () {
            return [].slice.call(this);
        };

        let rate = this.state.rating;
        console.log(rate);
        if(this.state.rating > 0 ){
            let renderNode = document.getElementsByClassName(className);
            console.log(renderNode);
            renderNode[0].children.toArray().forEach(function (item) {
                //console.log(item);
                let index = parseInt(item.getAttribute('data-index')) + 1;
                if (index <= rate){
                    item.setAttribute('class', 'star starStyle')//starStyle是评分的背景色
                }else if(item.getAttribute('class') !== 'rate'){
                    item.setAttribute('class', 'star')
                }
            })
        }

        return(
            <div className={className} onClick={(e)=>this.updateStar(e, e.target.getAttribute('data-index'))}>
                <i data-index="0" className="star"></i>
                <i data-index="1" className="star"></i>
                <i data-index="2" className="star"></i>
                <i data-index="3" className="star"></i>
                <i data-index="4" className="star"></i>
                <span className="rate">{this.state.rating}</span>
            </div>
        )
    }
}

export default Star