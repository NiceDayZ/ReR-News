document.getElementsByClassName('menu-toggle')[0].addEventListener('click', function () {
    document.getElementsByClassName('nav')[0].classList.toggle('showing');
});



function checkToken(){
    const token = localStorage.getItem('x-auth-token');
    if(!token){
        window.location.href = '/';
    }else{
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4) {   
            if (xmlhttp.status == 200) {
                ready(function(data){
                   const stats = data.stats;


                   
                   new Chart(document.getElementById("chart_news"), {
                    type: 'bar',
                    data: {
                      labels: Object.keys(stats.news),
                      datasets: [
                        {
                          label: "Prefer",
                          backgroundColor: ["#1a52ee","#5320e3","#0c6c1b","#3352bb","#580650","#86921c","#d1c62d","#3581ed","#5f228c","#967ff2","#707271","#5e2774","#4dbf5c","#878c3f","#b3981f","#901c0a","#a615da","#2a0440","#3ecccd","#c949a1","#9061cc","#51f05a","#b42ba6","#533541","#4ffe19","#613175","#8a4aa6","#b6b17a","#0f4aae","#b2073e","#403dc5","#e4ad14","#055430","#448759","#ea47cf","#f4067a","#a13087","#2ecc60","#15f51c","#60af7e"],
                          data: Object.values(stats.news)
                        }
                      ]
                    },
                        options: {
                        legend: { display: false },
                        title: {
                            display: true,
                            text: 'Preferences based on categories'
                        }
                        }
                    });

                    new Chart(document.getElementById("chart_images"), {
                        type: 'bar',
                        data: {
                          labels: Object.keys(stats.images),
                          datasets: [
                            {
                              label: "Prefer",
                              backgroundColor: ["#1a52ee","#5320e3","#0c6c1b","#3352bb","#580650","#86921c","#d1c62d","#3581ed","#5f228c","#967ff2","#707271","#5e2774","#4dbf5c","#878c3f","#b3981f","#901c0a","#a615da","#2a0440","#3ecccd","#c949a1","#9061cc","#51f05a","#b42ba6","#533541","#4ffe19","#613175","#8a4aa6","#b6b17a","#0f4aae","#b2073e","#403dc5","#e4ad14","#055430","#448759","#ea47cf","#f4067a","#a13087","#2ecc60","#15f51c","#60af7e"],
                              data: Object.values(stats.images)
                            }
                          ]
                        },
                            options: {
                            legend: { display: false },
                            title: {
                                display: true,
                                text: 'Preferences based on categories'
                            }
                            }
                        });
                    new Chart(document.getElementById("chart_videos"), {
                        type: 'bar',
                        data: {
                            labels: Object.keys(stats.videos),
                            datasets: [
                            {
                                label: "Prefer",
                                backgroundColor: ["#1a52ee","#5320e3","#0c6c1b","#3352bb","#580650","#86921c","#d1c62d","#3581ed","#5f228c","#967ff2","#707271","#5e2774","#4dbf5c","#878c3f","#b3981f","#901c0a","#a615da","#2a0440","#3ecccd","#c949a1","#9061cc","#51f05a","#b42ba6","#533541","#4ffe19","#613175","#8a4aa6","#b6b17a","#0f4aae","#b2073e","#403dc5","#e4ad14","#055430","#448759","#ea47cf","#f4067a","#a13087","#2ecc60","#15f51c","#60af7e"],
                                data: Object.values(stats.videos)
                            }
                            ]
                        },
                            options: {
                            legend: { display: false },
                            title: {
                                display: true,
                                text: 'Preferences based on categories'
                            }
                            }
                        });
                    new Chart(document.getElementById("chart_books"), {
                        type: 'bar',
                        data: {
                            labels: Object.keys(stats.books),
                            datasets: [
                            {
                                label: "Prefer",
                                backgroundColor: ["#1a52ee","#5320e3","#0c6c1b","#3352bb","#580650","#86921c","#d1c62d","#3581ed","#5f228c","#967ff2","#707271","#5e2774","#4dbf5c","#878c3f","#b3981f","#901c0a","#a615da","#2a0440","#3ecccd","#c949a1","#9061cc","#51f05a","#b42ba6","#533541","#4ffe19","#613175","#8a4aa6","#b6b17a","#0f4aae","#b2073e","#403dc5","#e4ad14","#055430","#448759","#ea47cf","#f4067a","#a13087","#2ecc60","#15f51c","#60af7e"],
                                data: Object.values(stats.books)
                            }
                            ]
                        },
                            options: {
                            legend: { display: false },
                            title: {
                                display: true,
                                text: 'Preferences based on categories'
                            }
                            }
                        });

                        const news_stats_btn = document.getElementById("news_stats");
                        const images_stats_btn = document.getElementById("images_stats");
                        const video_stats_btn = document.getElementById("video_stats");
                        const books_stats_btn = document.getElementById("books_stats");

                        news_stats_btn.addEventListener('click', function(){
                            if(!document.getElementById("chart_news").classList.contains('hide')){
                                document.getElementById("chart_news").classList.add('hide');
                            }
                            if(!document.getElementById("chart_images").classList.contains('hide')){
                                document.getElementById("chart_images").classList.add('hide');
                            }
                            if(!document.getElementById("chart_videos").classList.contains('hide')){
                                document.getElementById("chart_videos").classList.add('hide');
                            }
                            if(!document.getElementById("chart_books").classList.contains('hide')){
                                document.getElementById("chart_books").classList.add('hide');
                            }

                            document.getElementById("chart_news").classList.remove('hide');
                        });
                        images_stats_btn.addEventListener('click', function(){
                            if(!document.getElementById("chart_news").classList.contains('hide')){
                                document.getElementById("chart_news").classList.add('hide');
                            }
                            if(!document.getElementById("chart_images").classList.contains('hide')){
                                document.getElementById("chart_images").classList.add('hide');
                            }
                            if(!document.getElementById("chart_videos").classList.contains('hide')){
                                document.getElementById("chart_videos").classList.add('hide');
                            }
                            if(!document.getElementById("chart_books").classList.contains('hide')){
                                document.getElementById("chart_books").classList.add('hide');
                            }

                            document.getElementById("chart_images").classList.remove('hide');
                        });
                        video_stats_btn.addEventListener('click', function(){
                            if(!document.getElementById("chart_news").classList.contains('hide')){
                                document.getElementById("chart_news").classList.add('hide');
                            }
                            if(!document.getElementById("chart_images").classList.contains('hide')){
                                document.getElementById("chart_images").classList.add('hide');
                            }
                            if(!document.getElementById("chart_videos").classList.contains('hide')){
                                document.getElementById("chart_videos").classList.add('hide');
                            }
                            if(!document.getElementById("chart_books").classList.contains('hide')){
                                document.getElementById("chart_books").classList.add('hide');
                            }

                            document.getElementById("chart_videos").classList.remove('hide');
                        });
                        books_stats_btn.addEventListener('click', function(){
                            if(!document.getElementById("chart_news").classList.contains('hide')){
                                document.getElementById("chart_news").classList.add('hide');
                            }
                            if(!document.getElementById("chart_images").classList.contains('hide')){
                                document.getElementById("chart_images").classList.add('hide');
                            }
                            if(!document.getElementById("chart_videos").classList.contains('hide')){
                                document.getElementById("chart_videos").classList.add('hide');
                            }
                            if(!document.getElementById("chart_books").classList.contains('hide')){
                                document.getElementById("chart_books").classList.add('hide');
                            }

                            document.getElementById("chart_books").classList.remove('hide');
                        });

                        document.getElementById("exportPDF").addEventListener('click', function(){
                            let news = document.getElementById("chart_news").toDataURL("image/jpeg", 1.0);
                            let images = document.getElementById("chart_images").toDataURL("image/jpeg", 1.0);
                            let videos = document.getElementById("chart_videos").toDataURL("image/jpeg", 1.0);
                            let books = document.getElementById("chart_books").toDataURL("image/jpeg", 1.0);

                            var doc = new jsPDF();
                            doc.addImage(news, 'JPEG', 0, 0, 210, 105);
                            doc.addPage();
                            doc.addImage(images, 'JPEG', 0, 0, 210, 105);
                            doc.addPage();
                            doc.addImage(videos, 'JPEG', 0, 0, 210, 105);
                            doc.addPage();
                            doc.addImage(books, 'JPEG', 0, 0, 210, 105);

                            doc.save("stats.pdf");
                        });

                }, JSON.parse(xmlhttp.responseText));
            }
            else {
                window.location.href = '/';
            }
            }
        };
        xmlhttp.open('GET', '/admin/stats', true);
        xmlhttp.setRequestHeader('x-auth-token', token);
        xmlhttp.send();
    }
}

function ready(fn, data) {
    if (document.readyState != 'loading'){
      fn(data);
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
}

checkToken();


//taken from https://stackoverflow.com/questions/14964035/how-to-export-javascript-array-info-to-csv-on-client-side
var download = function(content, fileName, mimeType) {
    var a = document.createElement('a');
    mimeType = mimeType || 'application/octet-stream';
  
    if (navigator.msSaveBlob) { // IE10
      navigator.msSaveBlob(new Blob([content], {
        type: mimeType
      }), fileName);
    } else if (URL && 'download' in a) { //html5 A[download]
      a.href = URL.createObjectURL(new Blob([content], {
        type: mimeType
      }));
      a.setAttribute('download', fileName);
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } else {
      location.href = 'data:application/octet-stream,' + encodeURIComponent(content); // only this mime type is supported
    }
  }