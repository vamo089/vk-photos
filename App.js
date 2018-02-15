import React, {Component} from 'react';
import Image from './components/Image';
import ModalWindow from './components/ModalWindow';
import './css/bootstrap.min.css';
import './css/modal.css';
import './css/style.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            media: {},
            data: null,
        };
        this.loadImage = this.loadImage.bind(this);
        this.getData = this.getData.bind(this);
        console.log(this.data);
    }

    getData(event) {
        let script = document.createElement('script');
        script.setAttribute('type', 'text/javascript');
        script.setAttribute('src', 'https://api.vk.com/api.php?oauth=1&method=photos.get&aid=wall&limit=50&extended=1&callback=getdata&uid=' + this.refs.id.value);
        document.getElementsByTagName('head')[0].appendChild(script);
        window.getdata = (result) => {
            this.setState({data: result});
        };
        event.preventDefault();
    }

    loadImage(id) {
        if (id > this.state.data.response.length - 1) {
            id = 0;
        }
        else if (id < 0) {
            id = this.state.data.response.length - 1;
        }
        ['src_xxxbig', 'src_xxbig', 'src_xbig', 'src_big', 'src', 'src_small'].some((item) => {
            if(qualitativePhotos.call(this, item)){
                this.setState({
                    media: {
                        id,
                        src: this.state.data.response[id][qualitativePhotos.call(this, item)],
                        likes: this.state.data.response[id].likes,
                        comments: this.state.data.response[id].likes
                    }
                });
                return item
            }
        });

        function qualitativePhotos(photosKey) {
            if(this.state.data.response[id][photosKey] !== undefined){
                return photosKey
            }
        }

    }


    componentDidMount() {
        document.addEventListener('keyup', (event) => {
            if (document.querySelector('#modal').checked) {
                if (event.key === 'ArrowRight') {
                    this.loadImage(this.state.media.id + 1)
                }
                else if (event.key === 'ArrowLeft') {
                    this.loadImage(this.state.media.id - 1)
                }
                else if (event.key === 'Escape') {
                    document.querySelector('#modal').checked = false;
                }
            }
        });
    }

    render() {
        return (
            <div className="container">
                <div className="data">
                    <form onSubmit={this.getData}>
                        <input placeholder='id' ref="id" className="input" type="text"/>
                        <button onClick={this.vkid} type="submit">send</button>
                    </form>
                </div>
                <div className="col-md-12">

                    {this.state.data !== null ?
                        this.state.data.response !== undefined ?
                            this.state.data.response.length > 0 ?
                                this.state.data.response.map((images, index) =>

                                    <Image
                                        OpenClose={() => {
                                            this.loadImage(index)
                                        }}
                                        id={index}
                                        key={index}
                                        src={images.src}
                                        likes={images.likes}
                                        comments={images.comments}/>)
                                : <h1 className='error_message'>Фото не найдны</h1> :
                            <h1 className='error_message'>id не существует</h1>
                     : <h1 className='error_message'>Введите id</h1>}
                </div>
                <ModalWindow ChangeImg={this.loadImage}
                             src={this.state.media.src}
                             id={this.state.media.id}
                             likes={this.state.media.likes}
                             comments={this.state.media.comments}/>
            </div>
        );
    }
}

export default App;
