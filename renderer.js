// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
let $ = require('jquery');  // jQuery now loaded and assigned to $
var fs = require('file-system');
let count = 0
let filename = 'contacts'
let sno = 0

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
      fs.readDir("C:\Users\Beta\Downloads\MEGA SAMPLES VOL-101", function(dir) {
            // es5
            for(var i = 0, l = dir.length; i < l; i++) {
              var filePath = dir[i];
              console.log(filePath)
            }
            // es6
            for(let filePath of dir) {
              console.log(filePath);
            }
          });
}

$('#click-counter').text(count.toString())
$('#countbtn').on('click', () => {
   count ++ 
   $('#click-counter').text(count)
}) 


