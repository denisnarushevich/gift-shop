var filterSlider = {
  node: null,
  init: function(){
    this.node = $('#filterSlider');
    var progress = $($('.progress', this.node)[0]);
    this.barMaxWidth = progress.width();
    this.barOffset = progress.offset();
    
    progress.mousedown(function(e){
      filterSlider.eventHandler(e);
      progress.bind('mousemove', filterSlider.eventHandler);
    });
    
    $(document).mouseup(function(){
      progress.unbind('mousemove');
    });
    
    return this;
  },
  setProgress: function(percent){
    $('.bar' ,this.node)[0].style.width = percent+'%';
    return this;
  },
  setValue: function(value){
    $('.cursor > div', this.node)[0].innerHTML = value;
    return this;
  },
  move: function(offsetX){
    var percent = Math.round(offsetX / this.barMaxWidth * 100);
    
    if ( percent < 0 || percent > 100 ) return;
    
    if ( percent <= 25 )
      var value = percent/25 * 50;
    else if ( percent <= 50 )
      var value = (percent - 25) / 25 * 50 + 50;
    else if ( percent <= 75 )
      var value = (percent - 50) / 25 * 400 + 100;
    else if ( percent <= 100 )
      var value = (percent - 75) / 25 * 500 + 500;
    
    this.setValue(value - (value % 5));
    this.setProgress(percent);
    
    return this;
  },
  eventHandler: function(e){
    filterSlider.move(e.pageX - filterSlider.barOffset.left);
    e.preventDefault();
  }
}
