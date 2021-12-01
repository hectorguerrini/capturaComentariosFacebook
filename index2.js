var querystring = require('qs');
var request = require('request')
var zlib = require("zlib");
var fs = require('fs');
var xl = require('excel4node');
var wb = new xl.Workbook();
 
// Add Worksheets to the workbook
var ws = wb.addWorksheet('Sheet 1');
var style = wb.createStyle({
  font: {
    size: 12,
  },
});
//let body = `av=100002953032019&__user=100002953032019&__a=1&__dyn=7AgNe-4amaWxd2u5bGSF8CC5EWq2uWAKGgS8WGt9LFGUqxebxGdwIhEpyAubGqK6qxeqax2qqE88O8GFUDyRUC48G5uF8iBAVuUG4WgPwXGu5E-ER2Ki8yU8p94jUXVoS445KuiaAzazpElwzx25VohGVoyaDzp8hz8faxle7-i4bh43GE-dgWrxjyo9F44UlDBgS6ojzoSaCCy894q4rGmmUS695UC-6pECBQGQWzTwzlAho-6AUKVF8-9zeV8CdU4S4e5aGfKLgKi-2afAmeyV8Pgyh7Bz9eawGZa5pox4ojUC6p4fUFoOmVrDDzXzK2iazUCbU-2a8GEkG6UpBCAmFoyvChHAy8uyUlzF8GWzUcA4AbhWBDG5Ey4qGUsDGfgWpzbzWgK7oOidmaybhbyUOby8C6o9rxidwAxGEO5e48bGAxtAG&__req=n&__be=1&__pc=PHASED%3Aufi_home_page_pkg&dpr=1&__rev=1000730638&__s=csifo2%3Aipxktq%3Atacyzp&fb_dtsg=AQGO-s6i39zZ%3AAQHyQtaqCnYY&jazoest=22094&__spin_r=1000730638&__spin_b=trunk&__spin_t=1558367723&fb_api_caller_class=RelayModern&fb_api_req_friendly_name=UFI2CommentsProviderPaginationQuery&variables=%7B%22after%22%3A%22AQHR-F38Ql4xC0C09nxZKeEFvwvDUrzvuCjeqDJB79EmNZCxmgYWOgWgOTZ7w32d1CJl19xbap4Y4d-jwkPer0YYMQ%22%2C%22before%22%3Anull%2C%22commentProfilePictureSizeDepth0%22%3A32%2C%22commentProfilePictureSizeDepth1%22%3A20%2C%22displayCommentsFeedbackContext%22%3A%22%7B%5C%22bump_reason%5C%22%3Anull%2C%5C%22comment_expand_mode%5C%22%3A3%2C%5C%22comment_permalink_args%5C%22%3A%7B%5C%22comment_id%5C%22%3Anull%2C%5C%22reply_comment_id%5C%22%3Anull%7D%2C%5C%22interesting_comment_fbids%5C%22%3A%5B%5D%2C%5C%22is_location_from_search%5C%22%3Afalse%2C%5C%22last_seen_time%5C%22%3Anull%2C%5C%22log_ranked_comment_impressions%5C%22%3Afalse%2C%5C%22probability_to_comment%5C%22%3Anull%2C%5C%22story_location%5C%22%3Anull%2C%5C%22story_type%5C%22%3Anull%7D%22%2C%22displayCommentsContextEnableComment%22%3Anull%2C%22displayCommentsContextIsAdPreview%22%3Anull%2C%22displayCommentsContextIsAggregatedShare%22%3Anull%2C%22displayCommentsContextIsStorySet%22%3Anull%2C%22feedLocation%22%3Anull%2C%22feedbackID%22%3A%22ZmVlZGJhY2s6MzIyMDczMzE4NDc4OTg5%22%2C%22feedbackSource%22%3A17%2C%22first%22%3A510%2C%22focusCommentID%22%3Anull%2C%22includeNestedComments%22%3Atrue%2C%22isInitialFetch%22%3Afalse%2C%22isComet%22%3Afalse%2C%22containerIsFeedStory%22%3Atrue%2C%22containerIsWorkplace%22%3Afalse%2C%22containerIsLiveStory%22%3Afalse%2C%22containerIsTahoe%22%3Afalse%2C%22last%22%3Anull%2C%22scale%22%3A1%2C%22useDefaultActor%22%3Atrue%2C%22viewOption%22%3Anull%7D&doc_id=2178933335477791`;
global.comentarios = [];

function getBody(cursor){
  let vari = JSON.stringify({
    "after": cursor,
    "before": null,
    "commentProfilePictureSizeDepth0": 32,
    "commentProfilePictureSizeDepth1": 20,
    "containerIsFeedStory": true,
    "containerIsLiveStory": false,
    "containerIsTahoe": false,
    "containerIsWorkplace": false,
    "displayCommentsContextEnableComment": null,
    "displayCommentsContextIsAdPreview": null,
    "displayCommentsContextIsAggregatedShare": null,
    "displayCommentsContextIsStorySet": null,
    "displayCommentsFeedbackContext": null,
    "feedbackID": "ZmVlZGJhY2s6MTI5MTQ0NzIxNzkyNTA3Ng==",
    "feedbackSource": 17,
    "feedLocation": null,
    "first": 50,
    "focusCommentID": null,
    "includeNestedComments": true,
    "isComet": false,
    "isInitialFetch": false,
    "last": null,
    "scale": 1,
    "useDefaultActor": true,
    "viewOption": null
  })
  let body = querystring.stringify({
    doc_id: "4425870374196953",
    fb_dtsg: "AQFzSbFOASWI7pk:9:1638387858",
    variables: vari
  });
  return body;
}
let fBody = getBody("AQHRQ3LQpTYsRj8u64CdpUoQQ6d4VFZNny27h5p4JBdmGoZa9MOkZxKkI6biYIchw4O2luQpkB5mCMXsGWokxCw9Lw");
global.options = {
    url:'https://www.facebook.com/api/graphql/',
    method: "POST",
    encoding:null,
    body:fBody,
    headers:{
        "Origin":"https://www.facebook.com",
        "Content-Type":"application/x-www-form-urlencoded",
        "Referer":"https://www.facebook.com/caeemmaua/photos/gm.1291447217925076/2926669690981538",
        "Accept-Encoding":"gzip, deflate",     
        "User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.157 Safari/537.36",           
        "Accept":"*/*",      
        "Cookie":"sb=vMZ5YW0GYWA7mGzZPYApwD2H; datr=Q8d5YWb368Qm-jj19duirquL; locale=en_US; wd=1365x969; c_user=100002953032019; xs=9%3AvnGlS1yQRfwaxQ%3A2%3A1638387858%3A-1%3A4924; fr=0ux7bfGTo7dns5bCy.AWUK9AihNERlylD46q4ktgbPt-M.BhXuzR.Y7.AAA.0.0.Bhp9CS.AWWSCJne50M; spin=r.1004788815_b.trunk_t.1638387860_s.1_v.2_",
    }
}


var requestWithEncoding = function(options, callback) {
    var req = request.post(options);

    req.on('response', function(res) {
        var chunks = [];
        res.on('data', function(data) {
            chunks.push(data);
        });
      
      res.on('end', function() {
        var buffer = Buffer.concat(chunks);
        var encoding = res.headers['content-encoding'];
        if (encoding == 'gzip') {
          zlib.gunzip(buffer, function(err, decoded) {
            callback(err, decoded && decoded.toString());
          });
        } else if (encoding == 'deflate') {
          zlib.inflate(buffer, function(err, decoded) {
            callback(err, decoded && decoded.toString());
          })
        } else {
          callback(null, buffer.toString());
        }
      });
    });

    req.on('error', function(err) {
      callback(err);
    });
  }
  function geraExcel() {
    ws.cell(1, 1).string('NomeAutor').style(style);
    ws.cell(1, 2).string('Comentario').style(style);
    global.comentarios.forEach((el ,index) => {
      ws.cell(index+2, 1).string(el.nomeAutor).style(style);
      ws.cell(index+2, 2).string(el.comentario).style(style);
    })
    wb.write('Excel.xlsx');
  }
  global.count = 0;
  function main(){
    global.count++;
    requestWithEncoding(global.options, function(err, data) {
      if (err) console.log(err);
      //else console.log(JSON.parse(data.replace('for (;;);','')));
      else {
        let json = JSON.parse(data)
        let arr = [];
        arr = json.data.feedback.display_comments.edges;
        arr.forEach(element => {
          if(!element.node.body){
            console.log(arr)                      
          } else {
            global.comentarios.push({
              nomeAutor: element.node.author.name,
              comentario: element.node.body.text ? element.node.body.text : ''
            })                        
          }                 
        });
        let cBody = getBody(json.data.feedback.display_comments.page_info.end_cursor);
        global.options.body = cBody;
        if(json.data.feedback.display_comments.page_info.has_next_page){
          main()
        } else {
          geraExcel()
        }
      };
    })
  }
  main()
  



