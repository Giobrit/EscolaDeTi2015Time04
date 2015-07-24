AppModule.controller("controllerFormPerfilAcesso", controllerFormPerfilAcesso, '$interval');

AppModule.controller("controllerListPerfilAcesso", controllerListPerfilAcesso);

AppModule.controller("controllerFormPerfilUsuario", controllerFormPerfilUsuario);

function controllerFormPerfilAcesso($scope, $http, $timeout, $routeParams, $location, $interval) {

//    $scope.itensAcessoSelecionados = [];
//    $scope.itemAcessoSelecionado = {};
//
//    $scope.salvar = function () {
//        if ($scope.editando) {
//            $scope.put("/perfilDeAcesso", $scope.perfilDeAcesso).success(onSuccess).error();
//        } else {
//            $scope.post("/perfilDeAcesso", $scope.perfilDeAcesso).success(onSuccess).error();
//        }
//        function onSuccess() {
//            $location.path("/PerfilAcesso/list");
//            alert("Perfil cadastrado com sucesso");
//        }
//        $scope.editar = function (id) {
//            $http.get("/perfilDeAcesso/" + id).success(onSuccess).error($scope.$scope.onError);
//
//            function onSuccess(data) {
//                $scope.perfilDeAcesso = data;
//            }
//        };
//    };
//
//    $scope.getItensAcesso = function (callback) {
//        $http.get("/itemAcesso/").success(onSuccess).error($scope.onError);
//
//        function onSuccess(data) {
//            callback(data);
//        }
//    };
//
//    $scope.selecionouItemAcesso = function (state) {
//        console.log(state);
//        $scope.itensAcessoSelecionados.push(state);
//    };
//
//    $scope.remover = function (itemAcesso) {
//        posicaoRemovida = $scope.itensAcessoSelecionados.indexOf(itemAcesso);
//        $scope.itensAcessoSelecionados.splice(posicaoRemovida, 1);
//    };

var start = new Date();
  var sec = $interval(function () {
    var wait = parseInt(((new Date()) - start) / 1000, 10);
    $scope.wait = wait + 's';
  }, 1000);

  // you could of course just include the template inline in your code, this example shows a template being returned from a function
  function rowTemplate() {
    return $timeout(function() {
      $scope.waiting = 'Concluido!';
      $interval.cancel(sec);
      $scope.wait = '';
      return '<div ng-class="{ \'my-css-class\': grid.appScope.rowFormatter( row ) }">' +
                 '  <div ng-if="row.entity.merge">{{row.entity.title}}</div>' +
                 '  <div ng-if="!row.entity.merge" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name" class="ui-grid-cell" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader }"  ui-grid-cell></div>' +
                 '</div>';
    }, 6000);
  }

  // Access outside scope functions from row template
  $scope.rowFormatter = function( row ) {
    return row.entity.gender === 'male';
  };

  $scope.waiting = 'Carregando...';

  $http.get('https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/100.json')
    .success(function (data) {
      data.forEach( function(row, index) {
        row.widgets = index % 10;
      });
      data[1].merge = true;
      data[1].title = "A merged row";
      data[4].merge = true;
      data[4].title = "Another merged row";
      $scope.data = data;
    });

  $scope.gridOptions = {
    enableFiltering: true,
    rowTemplate: rowTemplate(),
    data: 'data',
    columnDefs: [
      { name: 'name' },
      { name: 'gender' },
      { name: 'company' },
      { name: 'widgets' },
      { name: 'cumulativeWidgets', field: 'widgets', cellTemplate: '<div class="ui-grid-cell-contents" title="TOOLTIP">{{grid.appScope.cumulative(grid, row)}}</div>' }
    ]
  };

  $scope.cumulative = function( grid, myRow ) {
    var myRowFound = false;
    var cumulativeTotal = 0;
    grid.renderContainers.body.visibleRowCache.forEach( function( row, index ) {
      if( !myRowFound ) {
        cumulativeTotal += row.entity.widgets;
        if( row === myRow ) {
          myRowFound = true;
        }
      }
    });
    return cumulativeTotal;
  };

}

function controllerListPerfilAcesso($scope, $http, $routeParams, $location) {

    $scope.init = function () {
        $scope.listar();
    };
    $scope.listar = function () {
        $http.post("/perfilDeAcesso/listar", requisicaoListagem).success(onSuccess).error($scope.$scope.onError);
        function onSuccess(data) {
            $scope.perfilDeAcesso = data.itens;
            $scope.totalRegistros = data.numeroTotalRegistros;
        }
    };
    $scope.alterarOrdenacao = function (coluna) {
        if ($scope.colunaOrdenacao === coluna) {
            $scope.ordenacaoCrescente = !$scope.ordenacaoCrescente;
        } else {
            $scope.ordenacaoCrescente = true;
        }

        $scope.colunaOrdenacao = coluna;
        $scope.listar();
    };
}


function controllerFormPerfilUsuario($scope, $http, $routeParams, $location) {

    $scope.perfis = [
        {nomePerfil: 'Perfil de Acesso 1', id: 1},
        {nomePerfil: 'Perfil de Acesso 2', id: 2},
        {nomePerfil: 'Perfil de Acesso 3', id: 3},
        {nomePerfil: 'Perfil de Acesso 4', id: 4}
    ];
    $scope.meuPerfil = $scope.perfis[0];

    $scope.adicionarPerfil = function () {
        $http.post("/perfilUsuario", $scope.perfilUsuario);

    };

    $scope.itens = [
        {nomeItem: 'Item Avulso 1'},
        {nomeItem: 'Item Avulso 2'}
    ];
    $scope.meuItem = $scope.itens[0];
    $scope.nomeItens = [
        {nome: 'Item Avulso 3'},
        {nome: 'Item Avulso 4'}
    ];

}
