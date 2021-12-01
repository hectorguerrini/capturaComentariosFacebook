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
    "shortcode":"CUqe40fLha-",
    "first":100,
    "after": cursor
  })
  let body = querystring.stringify({
    query_hash: "bc3296d1ce80a24b1b6e40b1e72903f5",
    variables: vari
  });
  return body;
}
let fBody = getBody("{\"cached_comments_cursor\": \"17917812266070674\", \"bifilter_token\": \"KFoBEADQACAAGAAQAAgACAAIAAgAP_-__-__7f6_2_W____-r__3__9_7_____t1gI_vrZ1PPn7J-t3_b_____f__n3_____3_b_6_z_3__f_7_5T1yh8jV5gCEA\"}");
let coockie = 'ig_did=6D9087D9-F8A7-4824-A88E-EFBDA4D7C414; ig_nrcb=1; mid=YXnJHAALAAFfG7yIm9iisQO5bLvd; fbm_124024574287414=base_domain=.instagram.com; csrftoken=dmSiDyr9EHpa81dMv8eWU0nXVsHZgqKh; ds_user_id=39360760; sessionid=39360760%3AGX5gOHQXwnOmgi%3A21; shbid="17121\05439360760\0541669925063:01f782b8509434186adde88a825fb06f6cfd36a07e7894c2877939a7c5318783e75b9862"; shbts="1638389063\05439360760\0541669925063:01f70b9fd18c28412eaa9b1e91baa1400dc233e997683337935d577f803d7bd640156791"; fbsr_124024574287414=daUeDsTyUKzdVE_FfItHabnlKJIZVM6LOrwtx9wKkFE.eyJ1c2VyX2lkIjoiMTAwMDAyOTUzMDMyMDE5IiwiY29kZSI6IkFRQWZUYnZ3S1FNWkhQc2pNRklHbDlqQ1FGTzRVOElGdEFFbWhDNjNXZURQZEZLN0lqNzFEU2FuMUNiM25qc00tdDY5eWhLUnk5aDVFLWVobWM5QnJPQ2hKNzkxUGVfNkpJR2FiQ0JDa2xUa2ZHMUsta19fUTh3X0ZjSDJHTFZuNTAzNzA1ZWl3NnJrMS1NeFhITmZqallXSFluZkdHMUZhNlZlQ2phR05SRlNzSEJSTGxkR1prX0VZcmd0cUJkcVNjSlEyRV9RaEtSdGxZdnpGeXp2OHBKMWI2bWJpSHJXdVZyODZ5dzZ1QWFjOFBzRTI4dkF1T05GM3phczlSRzVVWG9PSDlpdjV1M0pGVFJrbG9CM3JkU3ZvRDBkTTIxMm9MdlVtSzQ3U3FTdEZfR0h6bGpreHgtUTRtQkVQWE1DNGlNeDJhN3RLWGlWLW43R1FJbk1ZaS1ZIiwib2F1dGhfdG9rZW4iOiJFQUFCd3pMaXhuallCQUxIVGJmb3NIcTR0ZTdicVdJTDFoSzd2cXIxZXBGU1pBSFpDeEtCbm1lUjU0VzJHRGROTGdUTm5yMlBaQTgzN2xlcXA4emtiVE40RUZsMTdzOFV6cWZJWkMycGk0Y1R6dzFsUlBOZmxWaDdaQzFhd29jb0xNZHFCVHpORTB1SFNuTVdXWkJ2QXRaQ1R5NjlqZDMzc0xyS3hSQVBqU2F5RExIRG9ETkpZT1NKdmlKOHZMeVVrYzRWUFB5YWF2eEwzUVpEWkQiLCJhbGdvcml0aG0iOiJITUFDLVNIQTI1NiIsImlzc3VlZF9hdCI6MTYzODM5MjY5NH0; fbsr_124024574287414=daUeDsTyUKzdVE_FfItHabnlKJIZVM6LOrwtx9wKkFE.eyJ1c2VyX2lkIjoiMTAwMDAyOTUzMDMyMDE5IiwiY29kZSI6IkFRQWZUYnZ3S1FNWkhQc2pNRklHbDlqQ1FGTzRVOElGdEFFbWhDNjNXZURQZEZLN0lqNzFEU2FuMUNiM25qc00tdDY5eWhLUnk5aDVFLWVobWM5QnJPQ2hKNzkxUGVfNkpJR2FiQ0JDa2xUa2ZHMUsta19fUTh3X0ZjSDJHTFZuNTAzNzA1ZWl3NnJrMS1NeFhITmZqallXSFluZkdHMUZhNlZlQ2phR05SRlNzSEJSTGxkR1prX0VZcmd0cUJkcVNjSlEyRV9RaEtSdGxZdnpGeXp2OHBKMWI2bWJpSHJXdVZyODZ5dzZ1QWFjOFBzRTI4dkF1T05GM3phczlSRzVVWG9PSDlpdjV1M0pGVFJrbG9CM3JkU3ZvRDBkTTIxMm9MdlVtSzQ3U3FTdEZfR0h6bGpreHgtUTRtQkVQWE1DNGlNeDJhN3RLWGlWLW43R1FJbk1ZaS1ZIiwib2F1dGhfdG9rZW4iOiJFQUFCd3pMaXhuallCQUxIVGJmb3NIcTR0ZTdicVdJTDFoSzd2cXIxZXBGU1pBSFpDeEtCbm1lUjU0VzJHRGROTGdUTm5yMlBaQTgzN2xlcXA4emtiVE40RUZsMTdzOFV6cWZJWkMycGk0Y1R6dzFsUlBOZmxWaDdaQzFhd29jb0xNZHFCVHpORTB1SFNuTVdXWkJ2QXRaQ1R5NjlqZDMzc0xyS3hSQVBqU2F5RExIRG9ETkpZT1NKdmlKOHZMeVVrYzRWUFB5YWF2eEwzUVpEWkQiLCJhbGdvcml0aG0iOiJITUFDLVNIQTI1NiIsImlzc3VlZF9hdCI6MTYzODM5MjY5NH0; rur="EAG\05439360760\0541669929154:01f7f8607b4723d3fbba94e8fb3f85af430697302ae00553927d5fb145b09745adcce685';
global.options = {
    url:'https://www.instagram.com/graphql/query/?'+fBody,
    method: "GET",
    encoding:null,    
    headers:{        
        "Content-Type":"application/x-www-form-urlencoded",
        "Referer":"https://www.instagram.com/p/CUqe40fLha-/",
        "Accept-Encoding":"gzip, deflate",     
        "User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.157 Safari/537.36",           
        "Accept":"*/*",
        "Cookie": coockie,
    }
}


var requestWithEncoding = function(options, callback) {
    var req = request.get(options);

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
    wb.write('Excel2.xlsx');
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
        if (json.data){
          arr = json.data.shortcode_media.edge_media_to_parent_comment.edges;
          arr.forEach(element => {
            if(!element.node){
              console.log(arr)                      
            } else {
              global.comentarios.push({
                nomeAutor: "@"+element.node.owner.username,
                comentario: element.node.text ? element.node.text : ''
              })                        
            }                 
          });
          let cBody = getBody(json.data.shortcode_media.edge_media_to_parent_comment.page_info.end_cursor);
          global.options.url = 'https://www.instagram.com/graphql/query/?'+cBody;
          console.log(global.comentarios.length);
          if(json.data.shortcode_media.edge_media_to_parent_comment.page_info.has_next_page){
            main()
          } else {
            geraExcel()
          }
        }else {
          main()
        }
        
      };
    })
  }
  main()
  



