module.exports = function() {

  var keepList = {
    head: [
    ],
    body: [
    ]
  };

  var siteScripts = {
    head: $('head').find('script[src]'),
    body: $('body').find('script[src]')
  };

  var kept = {
    head: [],
    body: []
  };

  var notKept = {
    head: [],
    body: []
  };

  for(var elem in siteScripts) {
    console.log(' ');
    console.log('- - - - - > search ',elem);
    console.log('- - - - - > siteScripts['+elem+'].length ',siteScripts[elem].length);
    siteScripts[elem].each(function() {
      var thisScript = $(this);
      var found = false;

      for(var i=0; i<keepList[elem].length;i++) {
        var matcher = new RegExp(keepList[elem][i]);
        var match = matcher.test(thisScript.attr('src'));
        if(match) {
          found=true;
        }
      };

      if(found) {
        console.log('- - - - - > keeping '+elem+' script ', thisScript.attr('src'));
        thisScript.attr('data-keep', 'true');
        kept[elem].push(thisScript.attr('src'));
      }
      else {
        var sIndex = notKept[elem].indexOf(thisScript.attr('src'));
        if(sIndex<0) {
          notKept[elem].push(thisScript.attr('src'));
        }
      }

    });
  }

  console.log(' ');
  console.log('= = = = > Kept',kept.head.length+kept.body.length,'scripts');
  console.log(kept);
  console.log(' ');
  console.log('X X X > Removed',notKept.head.length+notKept.body.length,'scripts');
  console.log(notKept);
  console.log(' ');

};
