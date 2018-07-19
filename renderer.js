// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
let $ = require('jquery');  // jQuery now loaded and assigned to $
var fs = require('file-system');
const {dialog} = require('electron').remote;
let count = 0
let filename = 'contacts'
let sno = 0
var nodeConsole = require('console');
var myConsole = new nodeConsole.Console(process.stdout, process.stderr);
var replace = require("str-replace");
var Enumerable  = require('linq');
var contains = require("string-contains");
var Unrar = require('node-unrar');
$('#add-to-list').on('click', () => {
   let name = $('#Name').val()
   let email = $('#Email').val()

   fs.appendFile('contacts', name + ',' + email + '\n')
   alert("added "+ name);
   addEntry(name, email)
})

function addEntry(name, email) {
   if(name && email) {
      sno++
      let updateString = '<tr><td>'+ sno + '</td><td>'+ name +'</td><td>' 
         + email +'</td></tr>'
      $('#contact-table').append(updateString)
   }
}

function loadAndDisplayContacts() {  
   
   //Check if file exists
   if(fs.existsSync(filename)) {
      let data = fs.readFileSync(filename, 'utf8').split('\n')
      
      data.forEach((contact, index) => {
         let [ name, email ] = contact.split(',')
         addEntry(name, email)
      })
   
   } else {
      console.log("File Doesn\'t Exist. Creating new file.")
      fs.writeFile(filename, '', (err) => {
         if(err)
            console.log(err)
      })
   }
}

loadAndDisplayContacts()

function readDirectory(){
      myConsole.log('Hello World! 1');
      dialog.showOpenDialog({
            title:"Select a folder",
            properties: ["openDirectory"]
        }, function (folderPaths) {
            myConsole.log(folderPaths);
            const result = replace.all( "\\" ).ignoringCase().from(folderPaths[0]).with( "/" );//the first directory only
            const files =  getFiles(result);
            myConsole.log(files.length);

               /*let filteredlist = Enumerable.from(files).where(i=>contains(i, ".wav"));
            myConsole.log(filteredlist.count());*/
            let filesCurrentDirectory = getFilesCurrentDirectory(result);
            let filteredlistCurrentDirectory = Enumerable.from(filesCurrentDirectory).where(i=>contains(i, ".rar"));
            alert(filteredlistCurrentDirectory[0]);
            var rar = new Unrar(filteredlistCurrentDirectory[0]);
            rar.extract(result, null, function (err) {
                  alert("unRar");
            //file extracted successfully.
            });


           // var rar = new Unrar('/path/to/file.rar');
           // myConsole.log(filteredlistCurrentDirectory.count());
        });
}

function getFilesCurrentDirectory(dir){
      let files_=[];
      var files = fs.readdirSync(dir);
      files.forEach((contact, index) => {
            var name = dir + '/' + contact;
            files_.push(name);
         })
         return files_;
}

function getFiles (dir, files_){//recursive
      files_ = files_ || [];
      var files = fs.readdirSync(dir);
      for (var i in files){
          var name = dir + '/' + files[i];
          if (fs.statSync(name).isDirectory()){
              getFiles(name, files_);
          } else {
              files_.push(name);
          }
      }
      return files_;
  }

$('#click-counter').text(count.toString())
$('#countbtn').on('click', () => {
   count ++ 
 
   
   readDirectory();
   $('#click-counter').text(count)
}) 


