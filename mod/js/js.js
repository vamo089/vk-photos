function sr(date) {
    button.disabled = true;
    var id = document.getElementById("id").value;
    var script = document.createElement('SCRIPT');
    script.src = "https://api.vk.com/api.php?oauth=1&method=photos.get&aid=wall&limit=50&extended=1&callback=jsonpCallback&uid=" + id + "";
    document.getElementsByTagName("head")[0].appendChild(script);
    loading.classList.add('visible');
    script.onload = function() {
        button.disabled = false;
        loading.classList.remove('visible');
    }
}

function jsonpCallback(data) {
    if (data.response) {
        if (data.response.length !== 0) {
            for (var i = 0; i < data.response.length; i++) {
                if (data.response[i].src_xxxbig !== undefined) {
                    setelement(i, data, 'src_xxxbig');
                    continue;
                } else if (data.response[i].src_xxbig !== undefined) {
                    setelement(i, data, 'src_xxbig');
                    continue;
                } else if (data.response[i].src_xbig !== undefined) {
                    setelement(i, data, 'src_xbig');
                    continue;
                } else if (data.response[i].src_big !== undefined) {
                    setelement(i, data, 'src_big');
                    continue;
                } else if (data.response[i].src !== undefined) {
                    setelement(i, data, 'src');
                    continue;
                } else if (data.response[i].src_small !== undefined) {
                    setelement(i, data, 'src_small');
                }
            }
        } else {
            error('К сожалению фото не найдены ;(');
        }
    } else {
        error('К сожалению введенного вами id не существет ;(');

    }
}
var photos = []; //грузим линки больших изображений
function setelement(i, data, src) {
    var img = document.createElement('img'); /////////////
    img.id = [i]; ///////////////////////////////////////
    img.classList.add('vk'); //////////////////////// Загружаем все картинки
    img.src = data.response[i].src; ////////////////////
    images.appendChild(img); ///////////////////////////
    photos.push(data.response[i][src]); //////////////////
    var classname = document.getElementsByClassName("vk");
    for (j = 0; j < classname.length; j++)
        classname[j].onclick = function() {
            cleanModal();
            var getid = this.getAttribute("id"); /////////////////////
            modal.checked = true; //////////////////////////////
            var img = document.createElement('img'); /////////////
            img.id = getid; ////////////////////////////////Загружаем картинку в модальное окно
            img.classList.add('modal-image'); ///////////////
            img.src = photos[getid]; //////////////////////////
            modalBody.appendChild(img); ////////////////////////
            likesСount.innerHTML = data.response[getid].likes.count;
            commentsСount.innerHTML = data.response[getid].comments.count;
            date(getid, data, 0);

            function nextImage(number, getid) { //////////////////////////////////////////////////////
                likesСount.innerHTML = data.response[parseInt(getid) + number].likes.count; ////////
                commentsСount.innerHTML = data.response[parseInt(getid) + number].comments.count; ////
                img.id = parseInt(getid) + number; //////////////////////////////////////////////////
                img.src = photos[parseInt(getid) + number]; ///////////////////////////////////////////Переключаем картинку вправо или влево
                date(getid, data, number); ////////////////////////////////////////////////////////////////
                loadingImage.classList.add('visible'); ///////////////////////////////////////////////////
                img.onload = function() { //////////////////////////////////////////////////////////////////
                    loadingImage.classList.remove('visible'); ///////////////////////////////////////////////
                }
            }

            document.getElementById("arrowl").onclick = function() { //Листаем изображение с помощью стрелки
                var getid = modalBody.getElementsByTagName("IMG")[0].getAttribute("id");
                parseInt(getid) <= 0 ? getid = data.response.length : false //после первой фотки показываем последнюю
                nextImage(-1, getid)
            }
            document.getElementById("arrowr").onclick = function() { //Листаем изображение с помощью стрелки
                var getid = modalBody.getElementsByTagName("IMG")[0].getAttribute("id");
                parseInt(getid) >= data.response.length - 1 ? getid = -1 : false //после последней фотки показываем первую
                nextImage(1, getid)
            }
            document.getElementsByClassName("modal-image")[0].onclick = function() { //Листаем изображение с помощью центрального фото
                var getid = modalBody.getElementsByTagName("IMG")[0].getAttribute("id");
                parseInt(getid) >= data.response.length - 1 ? getid = -1 : false //после последней фотки показываем первую
                nextImage(1, getid)
            }
            document.onkeydown = function(evt) {
                evt = evt || window.event;
                if (evt.keyCode == 27) {
                    document.getElementById("closes-modal").click();
                }
                if (evt.keyCode == 37) {
                    var getid = modalBody.getElementsByTagName("IMG")[0].getAttribute("id");
                    parseInt(getid) <= 0 ? getid = data.response.length : false //после первой фотки показываем последнюю
                    nextImage(-1, getid)
                }
                if (evt.keyCode == 39) {
                    var getid = modalBody.getElementsByTagName("IMG")[0].getAttribute("id");
                    parseInt(getid) >= data.response.length - 1 ? getid = -1 : false //после последней фотки показываем первую
                    nextImage(1, getid)
                }

            };            
        };

}

function date(getid, data, number) {
    var date = new Date(data.response[parseInt(getid) + number].created * 1000);
    var month = date.getMonth();
    switch (month) {
        case 0:
            month = "Января";
            break;
        case 1:
            month = "Февраля";
            break;
        case 2:
            month = "Марта";
            break;
        case 3:
            month = "Апреля";
            break;
        case 4:
            month = "Мая";
            break;
        case 5:
            month = "Июня";
            break;
        case 6:
            month = "Июля";
            break;
        case 7:
            month = "Августа";
            break;
        case 8:
            month = "Сентября";
            break;
        case 9:
            month = "Октября";
            break;
        case 10:
            month = "Ноября";
            break;
        case 11:
            month = "Декабря";
            break;
    }
    document.getElementById("date").innerHTML = date.getDate() + " " + month + " " + date.getFullYear();
}

function error(errors) {
    document.getElementById("error").innerHTML = errors;
    document.getElementById("error").classList.add('visible');
}

function cleanImages() { //очищаем все фото и ошибки
    photos.splice(0, photos.length)
    images.innerHTML = '';
    document.getElementById("error").innerHTML = '';
}

function cleanModal() { //очищаем модаль
    var clean = document.getElementsByClassName("clean");
    for (i = 0; i < clean.length; i++) {
        clean[i].innerHTML = '';
    }
};