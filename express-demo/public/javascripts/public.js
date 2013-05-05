function destroy(that){
    if (confirm('Are you sure?')) { 
    	$("<form style='display:none' method='POST'><input type='hidden' name='_method' value='DELETE'/></form>")
        	.appendTo($(that).parent())
        	.attr('action', that.href)
        	.submit();
    };
    return false;
}
