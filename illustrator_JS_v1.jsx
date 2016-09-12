﻿#target Illustrator// Species or genera abundance representation in columns per samples// Version 1var width = 841.89;         //define the width of the documentvar height = 595.28;        //define the height of the documentvar topmargin = 80;         //define the top margin of the documentvar rightmargin = 10;       //define the right margin of the documentvar bottommargin = 20;      //define the bottom margin of the documentvar leftmargin = 40;        //define the left margin of the documentvar columnheight = height-topmargin-bottommargin;           //define the column heightvar samples, nrcolumns, nrsamples, columnwidth;var doc = app.documents.add(null, width, height, 1);        //create an A4-sized document in landscape orientation with one artboardvar p = doc.pathItems; //add an array of path itemsvar csvFile;/* function loadCSV(csvFile){    var csvFile = File.openDialog();    //load the csv file into variable csvFile    //checks if the file exists}; */var csvFile = File('~/Git/illustrator_JS/Abundance.csv');if (!csvFile.exists){    $.writeln("Error: CSV File Not Found");};drawDelimiterLines();nrcolumns = numberOfColumns(csvFile); //establish the number of columnscolumnwidth = determinecolumnwidth(nrcolumns);drawColumns(csvFile, nrcolumns); //call the drawingfunction numberOfColumns(fileObj)           //calculate the number of columns{      var thisLine;    var nrcolumns = 0;            fileObj.open( 'r' );        while (!fileObj.eof)         {            thisLine = fileObj.readln();            nrcolumns++;        };    fileObj.close();    return nrcolumns - 1; };function determinecolumnwidth(nrcolumns){    if (nrcolumns <= 11)    {        columnw = 64.1;    }    else if (nrcolumns > 11 && nrcolumns <= 13)    {        columnw = 50.1;    }    else if (nrcolumns > 13 && nrcolumns <= 15)    {        columnw = 44.1;    }    else if (nrcolumns > 15 && nrcolumns <= 19)    {        columnw = 34.1;    }    else if (nrcolumns > 19 && nrcolumns < 21)    {        columnw = 30.1;    }    else    {        alert('This script support a maximum of 20 columns. Illustrator document will be generated, but not as expected.');        columnw = 23.1;        }    return columnw;};function drawDelimiterLines(){    var delimiterlines=p.add();        delimiterlines.setEntirePath([        [5, bottommargin],        [width - rightmargin, bottommargin]        ]);        delimiterlines.strokeWidth=1.5;            var delimiterlines2=p.add();        delimiterlines2.setEntirePath([        [5, bottommargin + columnheight],        [width - rightmargin, bottommargin + columnheight]        ]);        delimiterlines2.strokeWidth=1.5;};function drawColumns (fileObj, nrcolumns) {    var speciesArray, thisLine;    fileObj.open('r');    var samples=[]; //place in samples[] the name of the samples from the first row    thisLine=fileObj.readln(); //read the first line    samples = thisLine.split( ',' ); //split the first line based on coma separation and put it to samples[]    samples.shift(); //remove the first element from samples[] because it is empty    nrsamples=samples.length; //count the number of samples    var sampleinterval=columnheight/nrsamples; //calculates the space between the samples in relation to column height and number of samples            var columnmargin=(width-(columnwidth*nrcolumns)-leftmargin-rightmargin)/(nrcolumns-1); //calculate the distance between columns                var speciesArray=[];    var speciesName;    var the=true;        for (i=1; i<=nrcolumns; i++) // go through the rest of the rows until the end of the csv file and put each line into an array and display the column     {         thisLine=fileObj.readln();        speciesArray=thisLine.split(',');                var columname = doc.textFrames.pointText([leftmargin + ((i-1)*columnwidth) + ((i-1)*columnmargin) + columnwidth/6, bottommargin + columnheight + 2]);        columname.rotate(45);        columname.textRange.characterAttributes.size = 12;        columname.contents = speciesArray[0];                        speciesArray.shift(); //remove the name of the column (species/genera); speciesArray contains only abundance values now        var max=(Math.ceil((Math.max.apply(null, speciesArray))/10)) *10; //find the maximum value from abundance and round it up to the nearest 10        var top=height-topmargin;        var left=leftmargin + ((i-1)*columnwidth) + ((i-1)* columnmargin);        var rect=p.rectangle(top, left, columnwidth, columnheight); //draw the column (as a rectangle)        rect.filled = false;        rect.strokeWidth = 1.5;                var dashedline=p.add();        dashedline.setEntirePath([        [leftmargin + ((i-1)*columnwidth) + ((i-1)*columnmargin) + columnwidth/2, bottommargin],        [leftmargin + ((i-1)*columnwidth) + ((i-1)*columnmargin) + columnwidth/2, bottommargin + columnheight]        ]);        dashedline.strokeWidth=1;        dashedline.strokeDashes=[4,4];                if (max/2 > 9)        {            var abundancevaluehalf = doc.textFrames.pointText([leftmargin + ((i-1)*columnwidth) + ((i-1)*columnmargin) + columnwidth/2.7, bottommargin - bottommargin/1.8]);        }        else        {           var abundancevaluehalf = doc.textFrames.pointText([leftmargin + ((i-1)*columnwidth) + ((i-1)*columnmargin) + columnwidth/2.2, bottommargin - bottommargin/1.8]);         }            abundancevaluehalf.contents = max / 2;                for (j=1; j<nrsamples; j++) //draw the lines at the left of each column from bottom to upper part        {                          var line=p.add(); //add a line                      line.setEntirePath([                        [leftmargin + ((i-1)*columnwidth) + ((i-1)*columnmargin) - 5, (bottommargin + ((j)*sampleinterval))],                        [leftmargin + ((i-1)*columnwidth) + ((i-1)*columnmargin), (bottommargin + ((j)*sampleinterval))]                        ]);            line.strokeWidth=1;        };                var samplestext = doc.textFrames.pointText([-7, bottommargin + columnheight + 35]);        samplestext.textRange.characterAttributes.size = 16;        samplestext.contents = "Samples";        samplestext.rotate(90);                if (i == 1)        {            for (z=0; z<=nrsamples-1; z++) //displays the name of the samples before the first column from the bottom to top            {                var textsamples=doc.textFrames.pointText([3, bottommargin + ((z)*sampleinterval) + (sampleinterval/4)]);                textsamples.contents=samples[z];                if (nrsamples > 30)                {                    textsamples.textRange.characterAttributes.size = 8;                }            };        }          var ell;        for (j=1, k=0; j<=nrsamples + 1, k<nrsamples; j++, k++)        {                ell = p.ellipse(                (bottommargin + ((j-1) * sampleinterval) + (sampleinterval/2) + 1.5),                (leftmargin + ((i-1)*columnwidth) + ((i-1)*columnmargin) + (speciesArray[k]*columnwidth/max) - 1.5),                3,                3,                );                ell.filled = true;                ell.strokeWidth = 1.5;                if (k > 0)                {                var newline=p.add(); //add a line between this ellipse and previous ellipse                newline.setEntirePath([                [leftmargin + ((i-1)*columnwidth) + ((i-1)*columnmargin + speciesArray[k-1]*columnwidth/max), bottommargin + ((j-2) * sampleinterval) + (sampleinterval/2)],                [leftmargin + ((i-1)*columnwidth) + ((i-1)*columnmargin + speciesArray[k]*columnwidth/max), bottommargin + ((j-1) * sampleinterval) + (sampleinterval/2)]                 ]);                newline.strokeCap = StrokeCap.ROUNDENDCAP;                if (nrsamples > 30 && nrsamples <= 60)                {                    newline.strokeWidth = 1.3;                }                else if (nrsamples > 60)                {                    newline.strokeWidth = 1.2;                }                else                {                    newline.strokeWidth = 2;                }                };          };};        fileObj.close();};