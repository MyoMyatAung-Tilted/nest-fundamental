'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">nest-fundamental documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-1b4fe1dab67669459c47cbe1b34fe42be450a2a4e1b3e4dbfe74c66ffacd9023864864934fbde70e45f4fdeb0509e8264a8cf815b2a15027d65b7bfc405733b9"' : 'data-bs-target="#xs-controllers-links-module-AppModule-1b4fe1dab67669459c47cbe1b34fe42be450a2a4e1b3e4dbfe74c66ffacd9023864864934fbde70e45f4fdeb0509e8264a8cf815b2a15027d65b7bfc405733b9"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-1b4fe1dab67669459c47cbe1b34fe42be450a2a4e1b3e4dbfe74c66ffacd9023864864934fbde70e45f4fdeb0509e8264a8cf815b2a15027d65b7bfc405733b9"' :
                                            'id="xs-controllers-links-module-AppModule-1b4fe1dab67669459c47cbe1b34fe42be450a2a4e1b3e4dbfe74c66ffacd9023864864934fbde70e45f4fdeb0509e8264a8cf815b2a15027d65b7bfc405733b9"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-1b4fe1dab67669459c47cbe1b34fe42be450a2a4e1b3e4dbfe74c66ffacd9023864864934fbde70e45f4fdeb0509e8264a8cf815b2a15027d65b7bfc405733b9"' : 'data-bs-target="#xs-injectables-links-module-AppModule-1b4fe1dab67669459c47cbe1b34fe42be450a2a4e1b3e4dbfe74c66ffacd9023864864934fbde70e45f4fdeb0509e8264a8cf815b2a15027d65b7bfc405733b9"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-1b4fe1dab67669459c47cbe1b34fe42be450a2a4e1b3e4dbfe74c66ffacd9023864864934fbde70e45f4fdeb0509e8264a8cf815b2a15027d65b7bfc405733b9"' :
                                        'id="xs-injectables-links-module-AppModule-1b4fe1dab67669459c47cbe1b34fe42be450a2a4e1b3e4dbfe74c66ffacd9023864864934fbde70e45f4fdeb0509e8264a8cf815b2a15027d65b7bfc405733b9"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-942818369b039d8b05542cdab50c23b2eb8d50e7ca6ccda047789f86db6f4ba0797596117e97a4fa5af87a7ca0b5caab49e2ed1528ad301192ab3ccac6c6d638"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-942818369b039d8b05542cdab50c23b2eb8d50e7ca6ccda047789f86db6f4ba0797596117e97a4fa5af87a7ca0b5caab49e2ed1528ad301192ab3ccac6c6d638"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-942818369b039d8b05542cdab50c23b2eb8d50e7ca6ccda047789f86db6f4ba0797596117e97a4fa5af87a7ca0b5caab49e2ed1528ad301192ab3ccac6c6d638"' :
                                            'id="xs-controllers-links-module-AuthModule-942818369b039d8b05542cdab50c23b2eb8d50e7ca6ccda047789f86db6f4ba0797596117e97a4fa5af87a7ca0b5caab49e2ed1528ad301192ab3ccac6c6d638"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-942818369b039d8b05542cdab50c23b2eb8d50e7ca6ccda047789f86db6f4ba0797596117e97a4fa5af87a7ca0b5caab49e2ed1528ad301192ab3ccac6c6d638"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-942818369b039d8b05542cdab50c23b2eb8d50e7ca6ccda047789f86db6f4ba0797596117e97a4fa5af87a7ca0b5caab49e2ed1528ad301192ab3ccac6c6d638"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-942818369b039d8b05542cdab50c23b2eb8d50e7ca6ccda047789f86db6f4ba0797596117e97a4fa5af87a7ca0b5caab49e2ed1528ad301192ab3ccac6c6d638"' :
                                        'id="xs-injectables-links-module-AuthModule-942818369b039d8b05542cdab50c23b2eb8d50e7ca6ccda047789f86db6f4ba0797596117e97a4fa5af87a7ca0b5caab49e2ed1528ad301192ab3ccac6c6d638"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/MetaOptionsModule.html" data-type="entity-link" >MetaOptionsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-MetaOptionsModule-c8635854cc9c26a1451f421d4d1562a6914e541655943e0cbfdd482a2d8b34283afe525fe9aed47795d32573aabbc04467a01f8dabd1c1df776c34ea71ada567"' : 'data-bs-target="#xs-controllers-links-module-MetaOptionsModule-c8635854cc9c26a1451f421d4d1562a6914e541655943e0cbfdd482a2d8b34283afe525fe9aed47795d32573aabbc04467a01f8dabd1c1df776c34ea71ada567"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-MetaOptionsModule-c8635854cc9c26a1451f421d4d1562a6914e541655943e0cbfdd482a2d8b34283afe525fe9aed47795d32573aabbc04467a01f8dabd1c1df776c34ea71ada567"' :
                                            'id="xs-controllers-links-module-MetaOptionsModule-c8635854cc9c26a1451f421d4d1562a6914e541655943e0cbfdd482a2d8b34283afe525fe9aed47795d32573aabbc04467a01f8dabd1c1df776c34ea71ada567"' }>
                                            <li class="link">
                                                <a href="controllers/MetaOptionsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MetaOptionsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-MetaOptionsModule-c8635854cc9c26a1451f421d4d1562a6914e541655943e0cbfdd482a2d8b34283afe525fe9aed47795d32573aabbc04467a01f8dabd1c1df776c34ea71ada567"' : 'data-bs-target="#xs-injectables-links-module-MetaOptionsModule-c8635854cc9c26a1451f421d4d1562a6914e541655943e0cbfdd482a2d8b34283afe525fe9aed47795d32573aabbc04467a01f8dabd1c1df776c34ea71ada567"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MetaOptionsModule-c8635854cc9c26a1451f421d4d1562a6914e541655943e0cbfdd482a2d8b34283afe525fe9aed47795d32573aabbc04467a01f8dabd1c1df776c34ea71ada567"' :
                                        'id="xs-injectables-links-module-MetaOptionsModule-c8635854cc9c26a1451f421d4d1562a6914e541655943e0cbfdd482a2d8b34283afe525fe9aed47795d32573aabbc04467a01f8dabd1c1df776c34ea71ada567"' }>
                                        <li class="link">
                                            <a href="injectables/MetaOptionsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MetaOptionsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PostsModule.html" data-type="entity-link" >PostsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-PostsModule-3e0529fe282ee44671688ef7585ac442844d9735d3b7cd1a124a6bc82b736513dcf63f74f2106b5f3fef32404daed4a22dc72e3ae2b4e2eab79c1e0444dd1da9"' : 'data-bs-target="#xs-controllers-links-module-PostsModule-3e0529fe282ee44671688ef7585ac442844d9735d3b7cd1a124a6bc82b736513dcf63f74f2106b5f3fef32404daed4a22dc72e3ae2b4e2eab79c1e0444dd1da9"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PostsModule-3e0529fe282ee44671688ef7585ac442844d9735d3b7cd1a124a6bc82b736513dcf63f74f2106b5f3fef32404daed4a22dc72e3ae2b4e2eab79c1e0444dd1da9"' :
                                            'id="xs-controllers-links-module-PostsModule-3e0529fe282ee44671688ef7585ac442844d9735d3b7cd1a124a6bc82b736513dcf63f74f2106b5f3fef32404daed4a22dc72e3ae2b4e2eab79c1e0444dd1da9"' }>
                                            <li class="link">
                                                <a href="controllers/PostsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PostsModule-3e0529fe282ee44671688ef7585ac442844d9735d3b7cd1a124a6bc82b736513dcf63f74f2106b5f3fef32404daed4a22dc72e3ae2b4e2eab79c1e0444dd1da9"' : 'data-bs-target="#xs-injectables-links-module-PostsModule-3e0529fe282ee44671688ef7585ac442844d9735d3b7cd1a124a6bc82b736513dcf63f74f2106b5f3fef32404daed4a22dc72e3ae2b4e2eab79c1e0444dd1da9"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PostsModule-3e0529fe282ee44671688ef7585ac442844d9735d3b7cd1a124a6bc82b736513dcf63f74f2106b5f3fef32404daed4a22dc72e3ae2b4e2eab79c1e0444dd1da9"' :
                                        'id="xs-injectables-links-module-PostsModule-3e0529fe282ee44671688ef7585ac442844d9735d3b7cd1a124a6bc82b736513dcf63f74f2106b5f3fef32404daed4a22dc72e3ae2b4e2eab79c1e0444dd1da9"' }>
                                        <li class="link">
                                            <a href="injectables/PostsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/TagsModule.html" data-type="entity-link" >TagsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-TagsModule-7b1d41ef66dd38ea914513dca9e423409bb9bebaac315030ab70198b699e6e6f565c4fe9a39852b8d4062b295511bc38a2824b389dd86dee2d84f63071579820"' : 'data-bs-target="#xs-controllers-links-module-TagsModule-7b1d41ef66dd38ea914513dca9e423409bb9bebaac315030ab70198b699e6e6f565c4fe9a39852b8d4062b295511bc38a2824b389dd86dee2d84f63071579820"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-TagsModule-7b1d41ef66dd38ea914513dca9e423409bb9bebaac315030ab70198b699e6e6f565c4fe9a39852b8d4062b295511bc38a2824b389dd86dee2d84f63071579820"' :
                                            'id="xs-controllers-links-module-TagsModule-7b1d41ef66dd38ea914513dca9e423409bb9bebaac315030ab70198b699e6e6f565c4fe9a39852b8d4062b295511bc38a2824b389dd86dee2d84f63071579820"' }>
                                            <li class="link">
                                                <a href="controllers/TagsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TagsController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UsersModule-c4dce2ba2f69b08d3d6c68f5694520068a128d22bf8e5a9a3af36ab1b7d811fbab0de2ea6dcf47b8fa08665f8810c8d13d0ed27b9f97e53438643c4d39eb510f"' : 'data-bs-target="#xs-controllers-links-module-UsersModule-c4dce2ba2f69b08d3d6c68f5694520068a128d22bf8e5a9a3af36ab1b7d811fbab0de2ea6dcf47b8fa08665f8810c8d13d0ed27b9f97e53438643c4d39eb510f"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-c4dce2ba2f69b08d3d6c68f5694520068a128d22bf8e5a9a3af36ab1b7d811fbab0de2ea6dcf47b8fa08665f8810c8d13d0ed27b9f97e53438643c4d39eb510f"' :
                                            'id="xs-controllers-links-module-UsersModule-c4dce2ba2f69b08d3d6c68f5694520068a128d22bf8e5a9a3af36ab1b7d811fbab0de2ea6dcf47b8fa08665f8810c8d13d0ed27b9f97e53438643c4d39eb510f"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsersModule-c4dce2ba2f69b08d3d6c68f5694520068a128d22bf8e5a9a3af36ab1b7d811fbab0de2ea6dcf47b8fa08665f8810c8d13d0ed27b9f97e53438643c4d39eb510f"' : 'data-bs-target="#xs-injectables-links-module-UsersModule-c4dce2ba2f69b08d3d6c68f5694520068a128d22bf8e5a9a3af36ab1b7d811fbab0de2ea6dcf47b8fa08665f8810c8d13d0ed27b9f97e53438643c4d39eb510f"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-c4dce2ba2f69b08d3d6c68f5694520068a128d22bf8e5a9a3af36ab1b7d811fbab0de2ea6dcf47b8fa08665f8810c8d13d0ed27b9f97e53438643c4d39eb510f"' :
                                        'id="xs-injectables-links-module-UsersModule-c4dce2ba2f69b08d3d6c68f5694520068a128d22bf8e5a9a3af36ab1b7d811fbab0de2ea6dcf47b8fa08665f8810c8d13d0ed27b9f97e53438643c4d39eb510f"' }>
                                        <li class="link">
                                            <a href="injectables/UserService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#entities-links"' :
                                'data-bs-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/MetaOption.html" data-type="entity-link" >MetaOption</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Post.html" data-type="entity-link" >Post</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Tag.html" data-type="entity-link" >Tag</a>
                                </li>
                                <li class="link">
                                    <a href="entities/User.html" data-type="entity-link" >User</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/CreatePostDto.html" data-type="entity-link" >CreatePostDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateTagDto.html" data-type="entity-link" >CreateTagDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetUserParamsDto.html" data-type="entity-link" >GetUserParamsDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetUserQueryDto.html" data-type="entity-link" >GetUserQueryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginDto.html" data-type="entity-link" >LoginDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/MetaOptionsDto.html" data-type="entity-link" >MetaOptionsDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PatchPostDto.html" data-type="entity-link" >PatchPostDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PatchUserDto.html" data-type="entity-link" >PatchUserDto</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});