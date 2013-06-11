    var rows;
	var cols;
	var row=new Array(rows);
	var col=new Array(cols);
	var stack=[];
	function initializeMatrix()
	{
		var arr=["GRGRGRRRGG","GGRRRRGGGR","RRRRGRGGGR","RRGRRGRGGG"];
		rows=arr.length;
		cols=arr[0].length;
		
		var $table = $('<table/>');
		for(var i=0;i<rows;i++)
		{
			var $tr=$('<tr/>');
			for(var j=0;j<cols;j++)
			{	
				var $wrap = $('<div/>');
				$wrap.attr('id',i.toString()+j.toString());
				$wrap.attr('class',arr[i][j]);
				var $td=$('<td/>');
				$td.append($wrap);
				$tr.append($td);
			}
			$table.append($tr);
		}
		$('#content').append($table);
	}
	function initializeRow()
	{
		for(i=0;i<rows;i++)
    	{	
			row[i]=0;
			for(j=0;j<cols;j++)
       		{
	   			var cell='#'+i.toString()+j.toString();
				if($(cell).attr("class")!='B')	row[i]+=1;
			}    
	   }
	}
	function initializeCol()
	{
		for(var i=0;i<cols;i++)
		{
			col[i]=0;
			for(j=0;j<rows;j++)
       		{
	   			var cell='#'+j.toString()+i.toString();
				if($(cell).attr("class")!='B')	col[i]+=1;
			}   
		}
	}
	function checkAdjacent(i,j,src)
	{
		var ii=parseInt(i)+1;
		var jj=parseInt(j)+1;
		if(i-1>=0 && $('#'+(i-1)+j).attr("class")==src) return true;
		if(ii<rows && $('#'+ii.toString()+j).attr("class")==src) return true;
		if(j-1>=0 && $('#'+i+(j-1)).attr("class")==src) return true;
		if(j+1<cols && $('#'+i+jj.toString()).attr("class")==src) return true;
		return false;
	}
	
	function shade(cur)
	{
		$('#'+cur).attr("class","B");
		$('#'+cur).hide(50);
		stack.push(cur);
		var x=cur[0];
		var y=cur[1];
		row[x]=row[x]-1;
		col[y]=col[y]-1;
	}
	function Fill(x,y,src)
	{
	   	stack_fill=function()
		{
			var cur=stack.pop();
			var i=cur[0];
			var j=cur[1];
			var ii=parseInt(i)+1;
			var jj=parseInt(j)+1;
			(i-1>=0 && $('#'+(i-1)+j).attr("class")==src)?shade((i-1)+j):i;		
			(jj<y && $('#'+i+jj.toString()).attr("class")==src)?shade(i+jj.toString()):i;
			(ii<x && $('#'+ii.toString()+j).attr("class")==src)?shade(ii.toString()+j):i;
			(j-1>=0 && $('#'+i+(j-1)).attr("class")==src)?shade(i+(j-1)):i;
			if(stack.length!=0) setTimeout(stack_fill,100);
			else
			{
					slideDown();
									
			}
			};
		
		setTimeout(stack_fill,100);
		
	}
	function slideDown()
	{
		var i=0;
		loopRow=function(){
			if(col[i]!=0 && col[i]!=cols)
			{
				for(var j=rows-1;j>=0;j--)
				{
					var cell='#'+j.toString()+i.toString();
					if($(cell).attr("class")=='B')
					{				
						for(var k=j-1;k>=0;k--)
						{
							var cell='#'+k.toString()+i.toString();
							if($(cell).attr("class")!='B')
							{
								$('#'+j.toString()+i.toString()).attr("class",$('#'+k.toString()+i.toString()).attr("class"));  
								$('#'+j.toString()+i.toString()).show();
								$('#'+k.toString()+i.toString()).attr("class","B"); 
								$('#'+k.toString()+i.toString()).hide();
								row[j]+=1;
								row[k]-=1;
								k=-2;
							}
												
						}
					
					}
				}
			}
			i++;
				if(i<cols)
					setTimeout(loopRow,100);
				else slideLeft();
		};
			loopRow();

	}
	function slideLeft()
	{
		var i=0;
		loopCol=function(){
			if(col[i]==0)
			{
				for(j=i+1;j<cols;j++)
				{
					if(col[j]!=0)
					{
						col[i]=col[j];
						col[j]=0;
						for(k=0;k<rows;k++)
						{
							$('#'+k.toString()+i.toString()).attr("class",$('#'+k.toString()+j.toString()).attr("class"));  
							$('#'+k.toString()+i.toString()).attr("class")!='B'?$('#'+k.toString()+i.toString()).show():'';
							$('#'+k.toString()+j.toString()).attr("class","B"); 
							//alert("hiding:"+k+j);
							$('#'+k.toString()+j.toString()).hide();
										
						}
					j=cols;
					}
				}
						
			}
			i++;
		if(i<cols)
		 {
		 	col[i]==0?setTimeout(loopCol,100):loopCol();
		 }
		};
		loopCol();
	}
$(function()
{
	initializeMatrix();
	initializeRow(rows);
	initializeCol(cols);
  	$("div").click(function() {
	var cur_id=$(this).attr("id");	
	var  i=cur_id[0];
	var j=cur_id[1];
	var src=$(this).attr("class");	
	if(checkAdjacent(i,j,src))
	{
		shade(i+j);
		Fill(rows,cols,src);
	}
});
});