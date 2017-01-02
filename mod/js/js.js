        "use strict";

        function requestId(url) {
            var head = document.head;
            var script = document.createElement("script");

            script.setAttribute("src", url);
            head.appendChild(script);
            head.removeChild(script);


            script.onload = function() {
                document.getElementById('loading').classList.remove('visible');

            }
        }

        function jsonpCallback(data) {
            if (data.response) {
                if (data.response.length == 0) {

                    document.getElementById("error").innerHTML = '';
                    document.getElementById("error").innerHTML = 'К сожалению фото не найдены ;(';
                    document.getElementById('error').classList.add('visible');
                }

                for (var i = data.response.length - 1; i >= 0; i--) {
                    document.getElementById("images").innerHTML += "<img class='vk' id=" + [i] + " src = " + data.response[i].src + ">";
                }



                var getid = function() {

                    document.onkeydown = function(evt) {
                        evt = evt || window.event;
                        if (evt.keyCode == 27) {
                            document.getElementById("closes-modal").click();
                        }
                        if (evt.keyCode == 37) {
                            ClickOnLeft(data);
                        }
                        if (evt.keyCode == 39) {
                            СlickOnRight(data);
                        }

                    };
                    var attr = this.getAttribute("id");

                    document.getElementById("modal").checked = true;
                    document.getElementById("likes-count").innerHTML = data.response[attr].likes.count;
                    document.getElementById("comments-count").innerHTML = data.response[attr].comments.count;


                    var date = new Date(data.response[attr].created * 1000);
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
                    document.getElementById("date").innerHTML = "<p>" + date.getDate() + " " + month + " " + date.getFullYear() + "</p>"

                    document.getElementById("arrowr").onclick = function() {
                        СlickOnRight(data);
                    }

                    document.getElementById("arrowl").onclick = function() {
                        ClickOnLeft(data);
                    }
                    document.getElementById('modal-body').onclick = function() {
                        СlickOnRight(data);
                    }
    
                    queryImg(data, attr);




                };
                var classname = document.getElementsByClassName("vk");
                for (var i = 0; i < classname.length; i++) {
                    classname[i].addEventListener('click', getid, false);
                }

            } else {
                document.getElementById("error").innerHTML = '';
                document.getElementById("error").innerHTML = 'К сожалению введенного вами id не существет ;(';
                document.getElementById('error').classList.add('visible');
            }

        }





        function sendRequest() {
            document.getElementById('error').classList.remove('visible');
            document.getElementById('loading').classList.add('visible');
            document.getElementById("images").innerHTML = '';
            requestId("https://api.vk.com/api.php?oauth=1&method=photos.get&aid=wall&limit=50&extended=1&callback=jsonpCallback&uid=" + id.value + "");

        }

        function СlickOnRight(data) {
            var bigid = document.getElementById("modal-body").getElementsByTagName("IMG")[0].getAttribute("id");

            if (bigid > 0) {
                var BigIdNumber = Number(bigid) - 1;


                AllClean();
                document.getElementById("likes-count").innerHTML = data.response[BigIdNumber].likes.count;
                document.getElementById("comments-count").innerHTML = data.response[BigIdNumber].comments.count;

                Dates(data, BigIdNumber);


                if (data.response[BigIdNumber].src_xxbig !== undefined) {

                    document.getElementById("modal-body").innerHTML = "<img id=" + [BigIdNumber] + " src = " + data.response[BigIdNumber].src_xxbig + ">";
                    return false;
                }
                if (data.response[BigIdNumber].src_xbig !== undefined) {
                    document.getElementById("modal-body").innerHTML = "<img id=" + [BigIdNumber] + " src = " + data.response[BigIdNumber].src_xbig + ">";
                    return false;
                }
                if (data.response[BigIdNumber].src_big !== undefined) {
                    document.getElementById("modal-body").innerHTML = "<img id=" + [BigIdNumber] + " src = " + data.response[BigIdNumber].src_big + ">";
                    return false;
                }
                if (data.response[BigIdNumber].src_small !== undefined) {
                    document.getElementById("modal-body").innerHTML = "<img id=" + [BigIdNumber] + " src = " + data.response[BigIdNumber].src_small + ">";
                }
            } else {
                AllClean();
                document.getElementById("likes-count").innerHTML = data.response[0].likes.count;
                document.getElementById("comments-count").innerHTML = data.response[0].comments.count;
                var lc = data.response.length - 1;

                var date = new Date(data.response[lc].created * 1000);
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
                document.getElementById("date").innerHTML = "<p>" + date.getDate() + " " + month + " " + date.getFullYear() + "</p>"

                if (data.response[lc].src_xxbig !== undefined) {
                    document.getElementById("modal-body").innerHTML = "<img id=" + [lc] + " src = " + data.response[lc].src_xxbig + ">";
                    return false;
                }
                if (data.response[lc].src_xbig !== undefined) {
                    document.getElementById("modal-body").innerHTML = "<img id=" + [lc] + " src = " + data.response[lc].src_xbig + ">";
                    return false;
                }
                if (data.response[lc].src_big !== undefined) {
                    document.getElementById("modal-body").innerHTML = "<img id=" + [lc] + " src = " + data.response[lc].src_big + ">";
                    return false;
                }
                if (data.response[lc].src_small !== undefined) {
                    document.getElementById("modal-body").innerHTML = "<img id=" + [lc] + " src = " + data.response[lc].src_small + ">";
                }

                return false;
            }
        }

        function ClickOnLeft(data) {

            var bigid = document.getElementById("modal-body").getElementsByTagName("IMG")[0].getAttribute("id");
            var lc = data.response.length - 1;

            if (bigid < lc) {
                var BigIdNumber = Number(bigid) + 1;

                AllClean();
                document.getElementById("likes-count").innerHTML = data.response[BigIdNumber].likes.count;
                document.getElementById("comments-count").innerHTML = data.response[BigIdNumber].comments.count;

                Dates(data, BigIdNumber);


                if (data.response[BigIdNumber].src_xxbig !== undefined) {

                    document.getElementById("modal-body").innerHTML = "<img id=" + [BigIdNumber] + " src = " + data.response[BigIdNumber].src_xxbig + ">";
                    return false;
                }
                if (data.response[BigIdNumber].src_xbig !== undefined) {
                    document.getElementById("modal-body").innerHTML = "<img id=" + [BigIdNumber] + " src = " + data.response[BigIdNumber].src_xbig + ">";
                    return false;
                }
                if (data.response[BigIdNumber].src_big !== undefined) {
                    document.getElementById("modal-body").innerHTML = "<img id=" + [BigIdNumber] + " src = " + data.response[BigIdNumber].src_big + ">";
                    return false;
                }
                if (data.response[BigIdNumber].src_small !== undefined) {
                    document.getElementById("modal-body").innerHTML = "<img id=" + [BigIdNumber] + " src = " + data.response[BigIdNumber].src_small + ">";
                }
            } else {
                AllClean();
                document.getElementById("likes-count").innerHTML = data.response[lc].likes.count;
                document.getElementById("comments-count").innerHTML = data.response[lc].comments.count;
                var date = new Date(data.response[0].created * 1000);
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
                document.getElementById("date").innerHTML = "<p>" + date.getDate() + " " + month + " " + date.getFullYear() + "</p>";

                if (data.response[0].src_xxbig !== undefined) {
                    document.getElementById("modal-body").innerHTML = "<img id=" + [0] + " src = " + data.response[0].src_xxbig + ">";
                    return false;
                }
                if (data.response[0].src_xbig !== undefined) {
                    document.getElementById("modal-body").innerHTML = "<img id=" + [0] + " src = " + data.response[0].src_xbig + ">";
                    return false;
                }
                if (data.response[0].src_big !== undefined) {
                    document.getElementById("modal-body").innerHTML = "<img id=" + [0] + " src = " + data.response[0].src_big + ">";
                    return false;
                }
                if (data.response[0].src_small !== undefined) {
                    document.getElementById("modal-body").innerHTML = "<img id=" + [0] + " src = " + data.response[0].src_small + ">";
                }

                return false;
            }
        }

        function queryImg(data, attr) {
            if (data.response[attr].src_xxbig !== undefined) {
                document.getElementById("modal-body").innerHTML = "<img id=" + [attr] + " src = " + data.response[attr].src_xxbig + ">";
                return false;
            }
            if (data.response[attr].src_xbig !== undefined) {
                document.getElementById("modal-body").innerHTML = "<img id=" + [attr] + " src = " + data.response[attr].src_xbig + ">";
                return false;
            }
            if (data.response[attr].src_big !== undefined) {
                document.getElementById("modal-body").innerHTML = "<img id=" + [attr] + " src = " + data.response[attr].src_big + ">";
                return false;
            }
            if (data.response[attr].src_small !== undefined) {
                document.getElementById("modal-body").innerHTML = "<img id=" + [attr] + " src = " + data.response[attr].src_small + ">";
            }

        };

        function Dates(data, BigIdNumber) {
            var date = new Date(data.response[BigIdNumber].created * 1000);
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
            document.getElementById("date").innerHTML = "<p>" + date.getDate() + " " + month + " " + date.getFullYear() + "</p>";
        };

        function AllClean() {
            document.getElementById("modal-body").innerHTML = '';
            document.getElementById("likes-count").innerHTML = '';
            document.getElementById("comments-count").innerHTML = '';
            document.getElementById("date").innerHTML = '';

        };