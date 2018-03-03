import React, {Component} from 'react'

class Star extends Component {
    state = {
        rating: '0',
    };


    updateStar = (value)=>{
        this.setState({rating: parseInt(value)+1, open: true});
        /*不能在这里用console验证，因为console会先执行，打印出上一次rating的值*/
    };

    render(){
        HTMLCollection.prototype.toArray = function () {
            return [].slice.call(this);
        };

        let rate = this.state.rating;
        document.getElementsByClassName('star').toArray().forEach(function (item) {
            let index = parseInt(item.getAttribute('data-index')) + 1;
            if (index <= rate){
                item.setAttribute('class', 'star starStyle')//starStyle是评分的背景色
            }else{
                item.setAttribute('class', 'star')
            }
            //console.log(item.getAttribute('data-index'));
        });

        return(
            <div onClick={(e)=>this.updateStar(e.target.getAttribute('data-index'))}>
                <i data-index="0" className="star"></i>
                <i data-index="1" className="star"></i>
                <i data-index="2" className="star"></i>
                <i data-index="3" className="star"></i>
                <i data-index="4" className="star"></i>
                <span className="rate">0</span>
            </div>
        )
    }
}

export default Star