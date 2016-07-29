var pdp = function() {

  var init = function() {
    initProductPage();
    initFixBreadcrumb();
    initProductBlock();
  };

  initProductPage = function() {
    body.addClass('mc-pdp');
  };

  initFixBreadcrumb = function() {
    var breadcrumbContainer = body.find('#breadcrumb');
    for( var i=0; i <= 2; i++ ) {
      var breadcrumbContents = breadcrumbContainer.contents();
      breadcrumbContents.last().remove();
    }
  };

  initProductBlock = function() {
    var productTable = body.find('#detalhes > table');
    var productTitle = productTable.find('tr:nth-of-type(2) h2');
    var productEntrega = productTitle.find('img');
    var productBlockContainer = productTable.find('tr:nth-of-type(3) table');
    var productImage = productBlockContainer.find('tr:nth-of-type(1) > td:nth-child(1)');

    productTable.addClass('mc-product-table');
    productTitle.addClass('mc-product-title');
    productBlockContainer.addClass('mc-product-block');
    productImage.addClass('mc-product-image');

    if( productEntrega ) {
      var entregaBadge = '<div class="mc-product-entrega">Pronta Entrega</div>';
      productEntrega.addClass('mc-hide');
      productTitle.after(entregaBadge);
    }
  };

  return {
    init: init
  };
}();

//Export
module.exports = function () {
  pdp.init();
};
