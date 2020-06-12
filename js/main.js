
function display_c() {
    var refresh = 1000; // Refresh rate in milli seconds
    mytime = setTimeout('display_ct()', refresh)
}
function display_ct() {
    var x = new Date()
    document.getElementById("current-time").innerHTML = x.toUTCString();
    display_c();
}
$.get("https://ipinfo.io", function (response) {
    var place = `${response.city}  ${response.country}`;
    document.getElementById("place").innerHTML = place;
}, "jsonp");
var dataLinks;
dataLinks = ['general', 'health', 'sports', 'business', 'science', 'technology'];
function links() {
    var lis = ``;
    for (var i = 0; i < dataLinks.length; i++) {
        lis += ` <li class="nav-item">
        <a class="nav-link" href="#">`+ dataLinks[i] + `</a>
    </li>`;
    }
    document.getElementById("nav").innerHTML = lis;

}
links();
var category = 'general';

getData(category);
var link = document.getElementsByClassName("nav-link");
for (i = 0; i < link.length; i++) {
    link[i].addEventListener("click", function (e) {
        category = e.target.text;
        getData(category);
    })
}
function getData(category) {
    var httpReq = new XMLHttpRequest();
    //  httpReq.open("GET","https://newsapi.org/v2/top-headlines?country=eg&category="+category+"&apiKey=872a0d109a604e12b7c3213144401847");
    httpReq.open("GET", "http://newsapi.org/v2/top-headlines?language=fr&country=eg&category=" + category + "&apiKey=872a0d109a604e12b7c3213144401847");
    httpReq.send();
    httpReq.addEventListener("readystatechange", function () {
        if (httpReq.readyState == 4 && httpReq.status == 200) {
            myData = JSON.parse(httpReq.response).articles;
            displayPosts();
        }
    })

}
var myData = [];


var postRow = document.getElementById("postrow");
function displayPosts() {
    var temp = ``;
    for (var i = 0; i < myData.length; i++) {
        temp += `  <div class='col-md-4  '>
        <div class='post-data'>
        
        <img class='img-fluid' src='`+ myData[i].urlToImage + `'>
        <a href=`+myData[i].url+`><h4>`+ myData[i].title + `</h4></a>
            <p>`+ myData[i].description + `</p>
        </div>
        
    </div>`;
    }
    document.getElementById("postrow").innerHTML = temp;
}
