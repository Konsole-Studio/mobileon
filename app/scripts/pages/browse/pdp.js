var pdp = function() {

  var init = function() {
    initProductPage();
    initFixBreadcrumb();
    initProductBlock();
  };

  initProductPage = function() {
    body.addClass('mo-pdp');
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

    productTable.addClass('mo-product-table');
    productTitle.addClass('mo-product-title');
    productBlockContainer.addClass('mo-product-block');
    productImage.addClass('mo-product-image');

    if( productEntrega ) {
      var entregaBadge = '<div class="mo-product-entrega">Pronta Entrega</div>';
      productEntrega.addClass('mo-hide');
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
