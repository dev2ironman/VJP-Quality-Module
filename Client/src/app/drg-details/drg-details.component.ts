import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-drg-details',
  templateUrl: './drg-details.component.html',
  styleUrls: ['./drg-details.component.css']
})
export class DrgDetailsComponent implements OnInit {

  drgObject:any;
  qpaObject:any;
  psObject:any;
  
  constructor() { }

  ngOnInit() {

    this.drgObject = JSON.parse(localStorage.getItem('drgObject'));
    this.qpaObject = JSON.parse(localStorage.getItem('qpaObject'));
    this.psObject = JSON.parse(localStorage.getItem('psObject'));

  }

  printPage() {
  
      const printContent = document.getElementById("componentID");
      const WindowPrt = window.open('', '', 'left=10,top=10,width=900,height=900,toolbar=0,scrollbars=0,status=0');
      WindowPrt.document.write(printContent.innerHTML);
      WindowPrt.document.write(`<style> 
      
      div{
        padding:5%
      }
      table, th, td {
        border: 1px solid black;
        border-collapse: collapse;
      }
      th, td {
        padding: 5px;
        text-align: left;
      }
      .bottomBorder {
        border-bottom-color: transparent;
      }
      .rightBorder {
        border-right-color: transparent;
      }
      .leftBorder{
        border-top-color : transparent;
      }
      * {box-sizing: border-box}
      body, html {
        height: 100%;
        margin: 0;
        font-family: Arial;
      }
      .tablink {
        background-color: #555;
        color: white;
        float: left;
        border: none;
        outline: none;
        cursor: pointer;
        padding: 5px 10px;
        font-size: 17px;
        width: 15%;
      }
      .tablink:hover {
        background-color: #777;
      }
      .tabcontent {
        color: black;
        display: none;
        padding: 50px 20px;
        height: 100%;
      }
      .bg {
      background-color:transparent;
      color: rgb(192, 192, 192);
      font-size: 40px;
      text-align: center;
      }
      .bg-text
      {
      color:lightgrey;
      font-size:40px;
      transform:rotate(300deg);
      -webkit-transform:rotate(300deg);
    
    }
      </style>`);
  
      WindowPrt.document.close();
      WindowPrt.focus();
      WindowPrt.print();
      WindowPrt.close();
    
  }


}
