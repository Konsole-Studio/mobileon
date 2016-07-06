/* All functions here will be available on index.js */

/* Fix src for images on pampa burger */
fixPampaImgSrc = function() {
  html.find('img.temp_no_img_src').each(function(i, elem) {
    var fixedSrc = $(this).attr('data-orig-src');
    $(this).removeClass('temp_no_img_src');
    $(this).attr('src', fixedSrc);
  });
}

module.exports = {
  fixPampaImgSrc: fixPampaImgSrc
};
