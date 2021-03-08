// Strange Eons 3 plug-in initialization script
// The Lord of the Rings: The Card Game

// libraries
useLibrary( 'imageutils') ;
useLibrary( 'markup' ) ;
useLibrary( 'extension' ) ;
useLibrary( 'ui' ) ;

const UiPath = 'TheLordOfTheRingsLCG/ui/' ;
const IconPath = 'TheLordOfTheRingsLCG/icon/' ;
const TextPath = 'TheLordOfTheRingsLCG/text/' ;
const ImagePath = 'TheLordOfTheRingsLCG/image/' ;

function getName(){ return @LRL ; }

function getDescription(){ return @LRL-description ; }

function getVersion(){ return 2.0 ; }

//variables and constants
var GameLanguage = Language.getGame() ;
var InterfaceLanguage = Language.getInterface() ;

function registerContextBarButton( name ){
	importClass( arkham.ContextBar ) ;
	
	var button = {
		buttonIcon : ImageUtils.createIcon( ImageUtils.get(UiPath+name+'.png') , IconSize , IconSize ) ,
		getID : function getID(){ return 'LRL'+name ; } ,
		getName : function getName(){ return name ; } ,
		getIcon : function getIcon(){ return this.buttonIcon ; } ,
		isVisibleInCurrentContext :
			function isVisibleInCurrentContext( context ){
				return context.isMarkupTarget() 
					&& ( context.gameComponent != null ) 
					&& ( context.getGame() == #LRL-TheLordOfTheRingsLCG ) ;
			} ,
	    isEnabledInCurrentContext : function isEnabledInCurrentContext( context ){ return true ; } ,
	    actionPerformed : function actionPerformed( actionEvent ){ 
	    		try{
        	    	var mt = Eons.markupTarget ;
            		mt.selectNone() ;
	           		mt.selectedText = "<"+Game.get('LRL').masterSettings.get(name+'-tag')+">" ;
    	    	}catch( ex ){ Error.handleUncaught( ex ) ; } 
    	    }
	} ;
	
	button = new JavaAdapter( ContextBar.Button , button ) ;
	ContextBar.registerButton( button ) ;
}

function initialize(){
	importPackage( arkham.dialog.prefs ) ;
	importClass( arkham.diy.ListItem ) ;
	
	// first, add user interface text to avoid errors during plugin loading
	InterfaceLanguage.addStrings( TextPath+'interface' ) ;
	InterfaceLanguage.addStrings( TextPath+'icons' ) ;
	GameLanguage.addStrings( TextPath+'game' ) ;
	
	// create plugin/game environment (identity within Strange Eons, settings scope, ...) 
	const GAME = Game.register(
		'LRL' , 'LRL-TheLordOfTheRingsLCG' ,
		ImageUtils.get( UiPath+'LRL.png' )
		//'LRL',@LRL-TheLordOfTheRingsLCG,#LRL-TheLordOfTheRingsLCG,ImageUtils.get('TheLordOfTheRingsLCG/ui/LRL.png'),null
	) ;
	GAME.masterSettings.addSettingsFrom( 'TheLordOfTheRingsLCG/LRL.settings' ) ;
	GAME.masterSettings.addSettingsFrom( 'TheLordOfTheRingsLCG/LRL-I.settings' ) ;

	if( $LRL-IconSize != null ){ IconSize = Number( $LRL-IconSize ) ; }
	else{ IconSize = 24 ; }
	
	if( $LRL-debug == null ) $LRL-debug = '5' ; 

	Eons.namedObjects.LRL = new gameObject();// GAME ) ;
	for( var index in Eons.namedObjects.LRL.TagList	){
		let item = Eons.namedObjects.LRL.TagList[index] ;
		registerContextBarButton( item ) ;
	}

/* Preferences dialog */
	importClass( ca.cgjennings.apps.arkham.dialog.prefs.FillInPreferenceCategory ) ;
	importClass( javax.swing.JTextField );
	
	var pc = new FillInPreferenceCategory( @LRL-shortTitle , UiPath+'LRL.png' ) ;

	pc.heading( @LRL-TheLordOfTheRingsLCG ) ; 
	pc.join() ;
	
	pc.addHelp( @LRL-guideLink , @LRL-guide , false ) ;
	
	pc.subheading( @LRL-textAlignment ) ;
	pc.join() ;	
	pc.addTip( @LRL-textAlignment-tip ) ;
//	
//	if( $LRL-Rules-alignment == null ) $LRL-Rules-alignment = '<left>' ;
//	pc.label( @LRL-Effect ) ; 
//	pc.join() ;
//	pc.addDropDown( 
//		'LRL-Rules-alignment' , 
//		[ @LRL-Left , @LRL-Center ,  @LRL-Right ] , 
//		[ '<left>' , '<center>' , '<right>' ] 
//	) ;
//	
//	if( $LRL-Shadow-alignment == null ) $LRL-Shadow-alignment = '<center>' ;
//	pc.label( @LRL-Shadow ) ; 
//	pc.join() ;
//	pc.addDropDown( 
//		'LRL-Shadow-alignment' , 
//		[ @LRL-Left , @LRL-Center ,  @LRL-Right ] , 
//		[ '<left>' , '<center>' , '<right>' ] 
//	) ;
//	
//	if( $LRL-Flavour-alignment == null ) $LRL-Flavour-alignment = '<right>' ;
//	pc.label( @LRL-Flavour ) ; 
//	pc.join() ;
//	pc.addDropDown( 
//		'LRL-Flavour-alignment' , 
//		[ @LRL-Left , @LRL-Center ,  @LRL-Right ] , 
//		[ '<left>' , '<center>' , '<right>' ] 
//	) ;
//		
//	if( $LRL-Story-alignment == null ) $LRL-Story-alignment = '<left>' ; 
//	pc.label( @LRL-Story ) ; 
//	pc.join() ;
//	pc.addDropDown( 
//		'LRL-Story-alignment' , 
//		[ @LRL-Left , @LRL-Center ,  @LRL-Right ] , 
//		[ '<left>' , '<center>' , '<right>' ] 
//	) ;
//	
//	pc.subheading( @LRL-textJustified ) ;
//	pc.join(); 
//	pc.addTip( @LRL-textJustified-tip ) ;
//	
//	if( $LRL-Enemy-justified == null ) $LRL-Enemy-justified = 'no' ; 
//	pc.addCheckBox( 'LRL-Enemy-justified' , @LRL-Enemy , false ) ;
//	
//	if( $LRL-Location-justified == null ) $LRL-Location-justified = 'no' ; 
//	pc.addCheckBox( 'LRL-Location-justified' , @LRL-Location , false ) ;
//	
//	if( $LRL-Objective-justified == null ) $LRL-Objective-justified = 'no' ;
//	pc.addCheckBox( 'LRL-Objective-justified' , @LRL-Objective , false ) ;
//	
//	if( $LRL-ObjectiveAlly-justified == null ) $LRL-ObjectiveAlly-justified = 'no' ;
//	pc.addCheckBox( 'LRL-ObjectiveAlly-justified' , @LRL-ObjectiveAlly , false ) ;
//	
//	if( $LRL-SideQuestEncounter-justified == null ) $LRL-SideQuestEncounter-justified = 'yes' ;
//	pc.addCheckBox( 'LRL-SideQuestEncounter-justified' , @LRL-SideQuestEncounter , false ) ;
//	
//	if( $LRL-Treachery-justified == null ) $LRL-Treachery-justified = 'no' ;
//	pc.addCheckBox( 'LRL-Treachery-justified' , @LRL-Treachery , false ) ;
//	
//	if( $LRL-Quest-justified == null ) $LRL-Quest-justified = 'yes' ;
//	pc.addCheckBox( 'LRL-Quest-justified' , @LRL-Quest , false ) ;
//	
//	if( $LRL-Campaign-justified == null ) $LRL-Campaign-justified = 'no' ; 
//	pc.addCheckBox( 'LRL-Campaign-justified' , @LRL-Campaign , false ) ;
//	
//	if( $LRL-Preparation-justified == null ) $LRL-Preparation-justified = 'no' ; 
//	pc.addCheckBox( 'LRL-Preparation-justified' , @LRL-Preparation , false ) ;
//
//	if( $LRL-Hero-justified == null ) $LRL-Hero-justified = 'no' ; 
//	pc.addCheckBox( 'LRL-Hero-justified' , @LRL-Hero , false ) ;
//	
//	if( $LRL-Ally-justified == null ) $LRL-Ally-justified = 'no' ; 
//	pc.addCheckBox( 'LRL-Ally-justified' , @LRL-Ally , false ) ;
//	
//	if( $LRL-Attachment-justified == null ) $LRL-Attachment-justified = 'no' ; 
//	pc.addCheckBox( 'LRL-Attachment-justified' , @LRL-Attachment , false ) ;
//	
//	if( $LRL-Event-justified == null ) $LRL-Event-justified = 'no' ; 
//	pc.addCheckBox( 'LRL-Event-justified' , @LRL-Event , false ) ;
//	
//	if( $LRL-Treasure-justified == null ) $LRL-Treasure-justified = 'no' ; 
//	pc.addCheckBox( 'LRL-Treasure-justified' , @LRL-Treasure , false ) ;
//	
//	if( $LRL-Gift-justified == null ) $LRL-Gift-justified = 'no' ; 
//	pc.addCheckBox( 'LRL-Gift-justified' , @LRL-Gift , false ) ;
//	
//	if( $LRL-SideQuestPlayer-justified == null ) $LRL-SideQuestPlayer-justified = 'yes' ; 
//	pc.addCheckBox( 'LRL-SideQuestPlayer-justified' , @LRL-SideQuestPlayer , false ) ;
//	
//	if( $LRL-QuestSheet-justified == null ) $LRL-QuestSheet-justified = 'yes' ; 
//	pc.addCheckBox( 'LRL-QuestSheet-justified' , @LRL-QuestSheet , false ) ;
//	
//	if( $LRL-RulesCard-justified == null ) $LRL-RulesCard-justified = 'yes' ; 
//	pc.addCheckBox( 'LRL-RulesCard-justified' , @LRL-RulesCard , false ) ;
//	
//	if( $LRL-Presentation-justified == null ) $LRL-Presentation-justified = 'yes' ; 
//	pc.addCheckBox( 'LRL-Presentation-justified' , @LRL-Presentation , false ) ;
//	
//	if( $LRL-Scenario-justified == null ) $LRL-Scenario-justified = 'yes' ; 
//	pc.addCheckBox( 'LRL-Scenario-justified' , @LRL-Scenario , false ) ;
//	
//	if( $LRL-Set-justified == null ) $LRL-Set-justified = 'yes' ; 
//	pc.addCheckBox( 'LRL-Set-justified' , @LRL-Set , false ) ;
//
////	if( $LRL-Draft == null ) $LRL-Draft = 'yes' ;
////	pc.addCheckBox('LRL-Draft',@LRL-Draft,false);
////	pc.join();
////	pc.addTip( @LRL-preferences-tip-draft );
//	
//	pc.subheading( @LRL-byComponent ) ;
//	
//	if( $LRL-Hero-Promo-outOfBox == null ) $LRL-Hero-Promo-outOfBox = 'yes' ; 
//	pc.addCheckBox( 'LRL-HeroPromo-outOfBox' , @LRL-HeroPromo-outOfBox , false ) ;
//
//	pc.subheading( @LRL-default ) ;
//	if( $LRL-CollectionInfo == null ) $LRL-CollectionInfo = 'Strange Eons' ; 
//	pc.addField( 'LRL-CollectionInfo' , @LRL-CollectionInfo , 20 ) ;
//	pc.join(); 
//	pc.addTip( @LRL-CollectionInfo-tip ) ;
//
//	if( $LRL-Copyright == null ) $LRL-Copyright = "\u00a9FFG \u00a9Middle-earth" ; 
//	pc.addField( 'LRL-Copyright' , @LRL-Copyright , 20 ) ;
//	pc.join() ; 
//	pc.addTip( @LRL-Copyright-tip ) ;
//
//	pc.label( @LRL-Collection ) ;
//	pc.join() ; 
//	if( $LRL-Collection == null ) $LRL-Collection = 'StrangeEonsIcon' ;
//	labels = Eons.namedObjects.LRL.DefaultIconList.concat( Eons.namedObjects.LRL.CollectionList ) ;
//	values = new Array();
//	for( index in labels ){
//		let item = labels[index];
//		labels[index] = @('LRL-'+item) ;
//		values[index] = item ;
//	}
//	pc.addDropDown( 'LRL-Collection' , labels , values ) ;
//	pc.indent() ; 
//	pc.indent() ; 
//	if( $LRL-CollectionUser == null ) $LRL-CollectionUser = '' ; 
//	pc.addField( 'LRL-CollectionUser' , @LRL-pathToIcon , 30 ) ;
////	pc.join() ; 
////	pc.addButton(
////		@LRL-preferences-pathToIcon ,
////		function addToList( actionEvent ) {
////			println(Settings.getParent())
////			var filename = ResourceKit.showImageFileDialog( null ) ;
////			if (filename != null){ settings.RawSettings.setUserSetting( 'LRL-CollectionUser' , filename )  }
////		} 
////	);	
//	pc.join() ; 
//	pc.addTip( @LRL-Collection-tip ) ;
//	pc.unindent() ;
//	pc.unindent() ;
//
//	pc.label( @LRL-EncounterSet ) ;
//	pc.join() ; 
//	if( $LRL-EncounterSet == null ) $LRL-EncounterSet = 'StrangeEonsIcon' ; 
//	labels = Eons.namedObjects.LRL.DefaultIconList.concat( Eons.namedObjects.LRL.EncounterSetList ) ;
//	values = new Array() ;
//	for( index in labels ){
//		let item = labels[index] ;
//		labels[index] = @('LRL-'+item) ;
//		values[index] = item ;
//	}
//	pc.addDropDown( 'LRL-EncounterSet' , labels , values ) ;
//	pc.indent() ; 
//	pc.indent() ; 
//	if( $LRL-EncounterSetUser == null ) $LRL-EncounterSetUser = '' ; 
//	pc.addField( 'LRL-EncounterSetUser' , @LRL-pathToIcon , 30 ) ;
////	pc.join() ; 
////	pc.addButton(
////		@LRL-preferences-pathToIcon ,
////		function action(){//addToList( actionEvent ) {
////			var filename = ResourceKit.showImageFileDialog( null ) ;
////			if (filename != null){ $LRL-EncounterSetUser = filename  }
////		} 
////	);	
//	pc.join() ; 
//	pc.addTip( @LRL-EncounterSet-tip ) ;
//	pc.unindent() ;
//	pc.unindent() ;
//	
//	pc.subheading( @LRL-localization ) ;
//	
//	pc.label( @LRL-locale ) ;
//	pc.join() ; 
//	if( $LRL-locale-toLoad == null ) $LRL-locale-toLoad = 'last' ; 
//	pc.addDropDown( 
//		'LRL-locale-toLoad' , 
//		[ @LRL-LastValues , @LRL-CurrentLocale , @LRL-SpecifiedLocale ] , 
//		[ 'last' , 'current' , 'specified' ]
//	) ;
//	pc.join() ; 
//	pc.addField( 'LRL-locale' , '' , 6 ) ;
//	pc.join() ; 
//	pc.addTip( @LRL-locale-tip ) ;
//	
////	pc.subheading( @LRL-preferences-subheading-debug ) ;
////	pc.addCheckBox( 'LRL-debug' , @LRL-preferences-debug , false ) ;
////	pc.join() ; 
////	pc.addTip( @LRL-preferences-tip-debug ) ;
//	
//	pc.addCheckBox( 'LRL-dontDelete' , @LRL-preferences-dontDelete , false ) ;
//	pc.join() ; 
//	pc.addTip( @LRL-dontDelete-tip ) ;
	
	Preferences.registerCategory( pc ) ;
}

function gameObject(){// GAME ){
	// "GameVariationList" includes the template variation list for 
	// strong game adaptations.
	this.GameVariationList = new Array( 
		'TheLordOfTheRingsLCG'// , // all the official and unoffical templates
		//'GUNNM' // new futuristic templates
	) ;

	// "DefaultIconList" defines the minimum item list for Collection
	// and EncounterSet lists
	this.DefaultIconList = new Array(
		'Custom' , // used to include icons through a Portrait_panel
		'Empty' , // used to not draw the icon
		'StrangeEonsIcon' // used to show the Strange Eons feather icon
	) ;
	
	this.ProductGroupList = new Array() ;
	if( sourcefile == 'Quickscript' ){
		this.ProductGroupList =  String($TheLordOfTheRingsLCG-ProductGroup-list).split(',') ;
	}else{
		this.ProductGroupList =  String(Game.get('LRL').masterSettings.get('TheLordOfTheRingsLCG-ProductGroup-list')).split(',') ;
	}
	debug( 3 , 'ProductGroupList: '+this.ProductGroupList ) ;
	
	this.CollectionList = new Array() ;
	for( index in this.ProductGroupList ){
		let productGroup = this.ProductGroupList[ index ] ;
		if( sourcefile == 'Quickscript' ){
			this.CollectionList = this.CollectionList.concat( 
				String($(productGroup+'-Collection-list')).split(',') 
			) ;
		}else{
			this.CollectionList = this.CollectionList.concat( 
				String(Game.get('LRL').masterSettings.get(productGroup+'-Collection-list')).split(',') 
			) ;
		}
	}
	debug( 3 , 'CollectionList: '+this.CollectionList ) ;

	this.EncounterSetList = new Array() ;
	for( index in this.CollectionList ){
		let item = this.CollectionList[index] ;
		if( sourcefile == 'Quickscript' ){
			this.EncounterSetList = this.EncounterSetList.concat( 
				String($(item+'-EncounterSet-list')).split(',') 
			) ;
		}else{
			this.EncounterSetList = this.EncounterSetList.concat( 
				String(Game.get('LRL').masterSettings.get(item+'-EncounterSet-list')).split(',') 
			) ;
		}
	}
	debug( 3 , 'EncounterSetList: '+this.EncounterSetList ) ;
	
	this.OptionSpecialList = new Array(
		'Empty'
		, 'Sailing'
		, 'EyeOfSauron'
		, 'EyeOfSauron2'
		, 'EyeOfSauron3'
		, 'EyeOfSauron4'
		, 'Person'	
	) ;
	debug( 3 , 'OptionSpecialList: '+this.OptionSpecialList ) ;
	
	this.SphereList = new String(Game.get('LRL').masterSettings.get('TheLordOfTheRingsLCG-Sphere-list')).split(',') ;
	debug( 3 , 'SphereList: '+this.SphereList ) ;
	
	this.FullIconList = new Array() ;
	for( index in this.CollectionList ){
		let collection = this.CollectionList[ index ] ;
		
		this.FullIconList = this.FullIconList.concat( collection ) ;
		
		if( sourcefile == 'Quickscript' ){
			encounterSetListForCurrentCollection = String($(collection+'-EncounterSet-list')).split(',') ;
		}else{
			encounterSetListForCurrentCollection = String(Game.get('LRL').masterSettings.get(collection+'-EncounterSet-list')).split(',') ;
		}
		for( index1 in encounterSetListForCurrentCollection ){
			let encounterSet = encounterSetListForCurrentCollection[ index1 ] ;
			this.FullIconList = this.FullIconList.concat( encounterSet ) ;
		}
	}
	this.FullIconList = this.FullIconList.concat( this.SphereList ) ;
	
	debug( 3 , 'FullIconList: '+this.FullIconList ) ;
	
	// Register fonts to be used in the plugin
	useLibrary( 'fontutils' ) ;
	var pathLRLfont = 'TheLordOfTheRingsLCG/font/LRLfont.ttf' ;
	var pathLRLsymbols = 'TheLordOfTheRingsLCG/font/LRLsymbols.ttf' ;
	var pathLRLwindlass = 'TheLordOfTheRingsLCG/font/LRLwindlass.ttf' ;
	var pathVafthaurdir = 'TheLordOfTheRingsLCG/font/Vafthaurdir.ttf' ;
	this.BodyFont = ResourceKit.getBodyFamily() ;
	this.LRLfont = FontUtils.registerFontFamilyFromResources.apply( this , [pathLRLfont] ) ;
	this.LRLsymbols = FontUtils.registerFontFamilyFromResources.apply( this , [pathLRLsymbols] ) ;
	this.LRLwindlass = FontUtils.registerFontFamilyFromResources.apply( this , [pathLRLwindlass] ) ;
	this.Vafthaurdir = FontUtils.registerFontFamilyFromResources.apply( this , [pathVafthaurdir] ) ;

//	this.DumbFont = FontUtils.registerFontFamilyFromResources.apply(this,['TheLordOfTheRingsLCG/font/Dumbledor.ttf']);
//	this.UnicodeFont = registerFont( 'Sun-ExtA.ttf' );

	// "StyleList" defines the tags for text styles used in boxes 
	this.StyleList = new Array(
		'LRLfont' ,
		'LRLsymbols' ,
		'LRLtitle' ,
		'Vafthaurdir' ,
		'Trait' ,
		'Section'
	) ;
		
	// "TagList" contains the available tags for text paragraphs
	// it's used to add the elements to the context bar too
	this.TagList = new Array(
		'Attack' ,
		'Defense' ,
		'Willpower' ,
		'Threat' ,
		'Unique' ,
		'Shadow' ,
		'VerticalSpacer' ,
		'HorizontalSpacer' ,
		'List' ,
		'Leadership' ,
		'Lore' ,
		'Spirit' ,
		'Tactics' ,
		'Baggins' ,
		'Fellowship' ,
		'Mastery' ,
		'HeadingOnCourse' ,
		'HeadingOffCourse' ,
		'HeadingBad' ,
		'HeadingWorst' ,
		'Sailing' ,
		'EyeOfSauron' ,
		'Person' ,
		'PerPlayer'
	) ;
	
	// "LocalizableList" contains the text elements used in any 
	// component it's used both for clearing a component and for
	// the in-component translations
	this.LocalizableList = new Array(
		'Adventure' ,
		'Artist' ,
		'ArtistBack' ,
		'CollectionInfo' ,
		'Condition' ,
		'ConditionBack' ,
		'Copyright' ,
		'Cycle' ,
		'Flavour' ,
		'FlavourBack' ,
		'FlavourLeft' ,
		'FlavourRight' ,
		'GameName' ,
		'Name' ,
		'NameBack' ,
		'OptionLeft' ,
		'OptionRight' ,
		'Rules' ,
		'RulesBack' ,
		'RulesLeft' ,
		'RulesRight' ,
		'Shadow' ,
		'Story' ,
		'StoryBack' ,
		'StoryLeft' ,
		'StoryRight' ,
		'Subtype' ,
		'Trait' ,
		'Type'
	) ;
}

