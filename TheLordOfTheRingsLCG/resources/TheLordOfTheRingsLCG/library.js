useLibrary( 'diy' ) ;
useLibrary( 'common' ) ;
useLibrary( 'ui' ) ;
useLibrary( 'markup' ) ;
useLibrary( 'fontutils' ) ;
useLibrary( 'imageutils' ) ;
useLibrary( 'tints' ) ;
importClass( arkham.component.DefaultPortrait ) ;
importClass( ca.cgjennings.graphics.ImageUtilities ) ;

/* VERSION CONTROL */
const LibraryVersion = 20 ;
//20: 2020 rewrite

/* CONSTANTS AND VARIABLES */
var GO = Eons.namedObjects.LRL ;
const ResourcesPath = 'TheLordOfTheRingsLCG/' ;
// "CardPath" is the path to the component specific files
// in the virtual file system.
var CardPath = ResourcesPath+Card+'/' ;
var TextPath = ResourcesPath+'text/' ;
var UiPath = ResourcesPath+'ui/' ;
var IconPath = ResourcesPath+'icon/' ;
var ImagePath = ResourcesPath+'image/' ;
var NumberPath = ImagePath+'number/' ;
var NumberTintablePath = ImagePath+'number-tintable/' ;

var GameLanguage = Language.getGame() ;
var InterfaceLanguage = Language.getInterface() ;
var PortraitList = [] ;
const FRONT = 0 ;
const BACK = 1 ;

importClass( ca.cgjennings.graphics.filters.StrokeFilter ) ;

function selectStroke( strokeSetting , diy ){
	switch( String(diy.settings.get(strokeSetting)) ){
	case 'Strong' : 
		var stroke =  new StrokeFilter( new Colour( 0xf0000000 , true ) , 2 , StrokeFilter.Position.OUTSIDE ) ;
		break ;
	case 'StrongThin' : 
		return new StrokeFilter( new Colour( 0xf0000000 , true ) , 1 , StrokeFilter.Position.OUTSIDE ) ;
		break ;
	case 'StrongWide' : 
		return new StrokeFilter( new Colour( 0xf0000000 , true ) , 3 , StrokeFilter.Position.OUTSIDE ) ;
		break ;
	case 'Medium' : 
		return new StrokeFilter( new Colour( 0xb0000000 , true ) , 2 , StrokeFilter.Position.OUTSIDE ) ;
		break ;
	case 'MediumThin' : 
		return new StrokeFilter( new Colour( 0xb0000000 , true ) , 1 , StrokeFilter.Position.OUTSIDE ) ;
		break ;
	case 'MediumWide' : 
		return new StrokeFilter( new Colour( 0xb0000000 , true ) , 3 , StrokeFilter.Position.OUTSIDE ) ;
		break ;
	case 'Light' : 
		return new StrokeFilter( new Colour( 0x80000000 , true ) , 2 , StrokeFilter.Position.OUTSIDE ) ;
		break ;
	case 'LightThin' : 
		return new StrokeFilter( new Colour( 0x80000000 , true ) , 1 , StrokeFilter.Position.OUTSIDE ) ;
		break ;
	case 'LightWide' : 
		return new StrokeFilter( new Colour( 0x80000000 , true ) , 3 , StrokeFilter.Position.OUTSIDE ) ;
		break ;
	case 'Custom' : 
		return new StrokeFilter( 
			diy.settings.getColour( strokeSetting ) , 
			diy.settings.getFloat( strokeSetting+'-width' ) , 
			StrokeFilter.Position.OUTSIDE 
		) ;
		break ;
	default : return new StrokeFilter( new Colour( 0xb0000000 , true ) , 2 , StrokeFilter.Position.OUTSIDE ) ;
	}
	return stroke ;
}

function getPortraitImage( key ){ return PortraitList[ portraitIndexOf( key ) ].getImage() ; }

if( Number( $uiIconSize ) == null ){
	debug( 4 , "uiIcon: $uiIconSize not defined." ) ;
	IconSize = 24 ;
}else{ IconSize = Number( $uiIconSize ) ; }

/* DEBUGGING */
function debug( level , text ){ if( true /*Number( $LRL-debug ) >= level*/ ) println( text ) ; }

/* HELPER FUNCTIONS */
function isOdd( number ){ return Boolean( number & 1 ) ; }

function getLocale(){ 
/*
Returns the main locale used by the component. This is used to support several
text translations in the same component.
*/
	var locale = String( Language.getGameLocale() ).split( '_' ) ;
	
	debug( 2 , 	'getLocale: '+String( Language.getGameLocale() ).split( '_' ) ) ;
	return String( locale[ 0 ] ) ;
}

function checkKey( key , appendix ){
/*
Looks for the most specific setting name. It's used to get correct settings
depending on component and template variant selected.
Will look for and RETURN, if it exists, in this order:
	1- Card-$Template-key
	2- Card-key
	3- $Template-key
	4- key
	5- null
If appendix is included, search key+appendix, but don't return
the appendix with the key. Useful for settings.getTint() etc.
*/
	if( appendix == null ) appendix = '' ; 
	
	var validKey ;
	if( $( Card+'-'+$Template+'-'+key+appendix ) != null ){
		validKey = String( Card+'-'+$Template+'-'+key ) ;
	}else{
		if( $( Card+'-'+key+appendix ) != null ){
			validKey = String( Card+'-'+key ) ;
		}else{
			if( $( $Template+'-'+key+appendix ) != null ){
				validKey = String( $Template+'-'+key ) ;
			}else{
				if( $( key+appendix ) != null ){ validKey = String( key ) ; }
				else{ validKey = null ; } 
			}
		}
	}
	
//	debug( 2 , '    checkKey: '+key+appendix+' : ' + validKey ) ;
	return validKey ;
}

function settingToArray( key , type ){
/*
Convert a setting to an array. Type determines if Number or String items must be returned.
*/
//	string = String( $( key ) ).replace( ' , ', ',' ); string = string.replace( ' ,', ',' );
//	string = string.replace( ', ', ',' ); string = string.split( ',' );

	var array = String($(key)).split(',') ;
	
	if( type == 'number' ) for( var index in array ){ array[ index ] = Number( array[ index ] ) ; }
	
	return array;
}

function createCombo( list ){
/*
Creates a combo suitable for a ui comboBox from a list.
It's used on components that use the same lists for several controls,
like EncounterSet, EncounterSet1, etc on Quest card.
*/
	importClass( arkham.diy.ListItem ) ;
	var combo = new Array() ;

	for( var index in list ){
		let item = list[ index ] ;
		combo[ index ] = ListItem( item , @('LRL-'+item) , uiIcon( item ) ) ;
	}
	return combo ;
}

function uiIconCombo( key , combo , bindings , sides ){
/*
Creates a user interface comboBox using a combo.
It's used on components that use the same lists for several controls,
like EncounterSet, EncounterSet1, etc on Quest card.
*/
	if( sides == null ) sides = [ FRONT , BACK ] ;
	
	var uiControl = new comboBox( combo , null ) ;
	
	bindings.add( key , uiControl , sides ) ;
	return uiControl ;
}

function uiIconList( key , list , bindings , sides ){
/*
Creates a user interface comboBox using the icons refered in "list".
*/
	importClass( arkham.diy.ListItem ) ;
	if( sides == null ) sides = [ FRONT , BACK ] ;
	var combo = new Array() ;

	for( var index in list ){
		let item = list[ index ] ;
		combo[ index ] = ListItem( item , @('LRL-'+item) , uiIcon( item ) ) ;
	}
	
	var uiControl = new comboBox( combo , null ) ;
	
	bindings.add( key , uiControl , sides ) ;
	return uiControl ;
}

/* TEXT FUNCTIONS */
function createTextBox( key , diy , sheet ){
/*
Used in createFrontPainter to load the settings related to the rules paragraph.
*/
	debug( 1 , 'createTextBox: '+key ) ;
	
	var box = new markupBox( sheet ) ;
	box.defaultStyle = diy.settings.getTextStyle( key , null ) ;
	box.setAlignment( diy.settings.getTextAlignment( key ) ) ;
	box.defaultStyle.add( SIZE, diy.settings.getPointSize( key , 8.0 ) ) ;
	box.defaultStyle.add( COLOUR, diy.settings.getColour( key ) ) ;
	box.setTabWidth( 0.2 ) ;
	box.setTextFitting( FIT_BOTH ) ;//fit text by shrinking it and reducing the space between lines
	box.setLineTightness( diy.settings.getFloat( key+'-lineTightness' , 1.0 ) ) ;

	switch( String($(key+'-textFitting')) ){
	case 'none': box.setTextFitting( FIT_NONE ) ; break ; //don't fit text
	case 'spacing': box.setTextFitting( FIT_TIGHTEN_LINE_SPACING ) ; break ;
	case 'scaling': box.setTextFitting( FIT_SCALE_TEXT ) ; break ; 
	case 'both': box.setTextFitting( FIT_BOTH ) ; break ; //fit text by shrinking it and reducing the space between lines
	}
	box.setScalingLimit( diy.settings.getFloat( key+'-scalingLimit' , 0.7 ) ) ;
	box.setTightnessLimit( diy.settings.getFloat( key+'-lineTightnessLimit' , 0.5 ) ) ;
	
	for( var index in GO.TagList ){
		let item = GO.TagList[ index ] ;
		box.setReplacementForTag( $(item+'-tag') , $(item+'-tag-replacement') ) ;
	}
	
	for( index in GO.StyleList ){
		let item = GO.StyleList[ index ] ;
		box.setStyleForTag( $(item+'-tag') , diy.settings.getTextStyle( item+'-style' , null ) ) ;
	}

	debug( 1 , 'createTextBox: '+box ) ;
	return box ;
}

function uiName( diy , bindings , sides ){
/*
Creates the component title/name control. It's different from other text
controls because it's linked to file name and other special features.
Component "sides" will be updated on control edit.
*/
	if( sides == null ) sides = [ FRONT , BACK ] ;
	debug( 1 , 'uiName: '+$Name+': '+sides ) ;
	
	diy.nameField =  new textField( $Name , 30 , null ) ;
	bindings.add( 'Name' , diy.nameField , sides ) ;
}

function uiText( key , bindings , sides ){
/*
Returns a user interface textField. Value will be initialized and binded
to $key. Component "sides" will be updated on control edit.
*/
	if( sides == null ) sides = [ FRONT , BACK ] ;
	debug( 1 , 'uiText: '+key+': '+sides ) ;

	var uiControl =  new textField( $( key ) , 30 , null ) ;
	bindings.add( key , uiControl , sides ) ;
	return uiControl ;	
}

function writeSubtype( g , diy ){
	if( $Subtype == '' ) text = #('LRL-'+$Template) ;
	else text = $Subtype ;
	writeLine( 
		text , Subtype_writer , 
		diy.settings.getRegion( 'Subtype' ) , g 
	) ;
}
function writeCycle( g , diy ){
	writeLine( 
		$Cycle , Cycle_writer , 
		diy.settings.getRegion( 'Cycle' ) , g 
	) ;
}
function writeAdventure( g , diy ){
	writeLine( 
		$Adventure , Adventure_writer , 
		diy.settings.getRegion( 'Adventure' ) , g 
	) ;
}
function writeSideA( g , diy ){
	let text ;
	if( $SideA == '' ) text = #LRL-SideA ;
	else text = $SideA ;
	writeLine( 
		text , Side_writer , 
		diy.settings.getRegion( 'Side' ) , g 
	) ;
}
function writeSideB( g , diy ){
	let text ;
	if( $SideB == '' ) text = #LRL-SideB ;
	else text = $SideB ;
	writeLine( 
		text , Side_writer , 
		diy.settings.getRegion( 'Side' ) , g 
	) ;
}

function writeLine( text , writer , region , g ){
/*
Draws $key on the component template $key-region.
*/
	debug( 1 , 'writeLine' ) ;
	writer.markupText = text ; 
	writer.drawAsSingleLine( g , region ) ;
}


function writeEncounterSetNumber( g , diy ){
	if( $EncounterSetNumberOverwrite ) text = $EncounterSetNumberOverwrite ;
	else if( $EncounterSetNumber > 0 ){
		if( $EncounterSetTotal > 0 ) text = $EncounterSetNumber+$EncounterSetNumberOf+$EncounterSetTotal ;
		else text = $EncounterSetNumber ;
	}else{ text = '' ; }
	writeLine( 
		text , EncounterSetNumber_writer , 
		diy.settings.getRegion( 'EncounterSetNumber' ) , g 
	) ;
}
function writeName( g , diy ){
	if( diy.settings.getBoolean( 'Unique' , false ) ) text = '<lrs>u</lrs><size 50%> <size 200%>'+$Name ;
	else text = $Name ;
	writeLine( 
		text , Name_writer , 
		diy.settings.getRegion( 'Name' ) , g 
	) ;
}
function writeNameRotated( g , diy ){
/*
Draws $key on the component template $key-region rotated.
*/
	if( diy.settings.getBoolean( 'Unique' , false ) ) text = '<lrs>u</lrs><size 50%> <size 200%>'+$Name ;
	else text = $Name ;
	Name_writer.markupText = text ; 
	
	var region = diy.settings.getRegion( 'Name' ) ;
	var oldTransform = g.getTransform() ;
	g.rotate( -Math.PI/2 , 0 , 0 ) ; // quitar 0s
	var newRegion = region.clone() ;
	var x = region.getX() ;
	var y = region.getY() ;
	var w = region.getWidth() ;
	var h = region.getHeight() ;
	newRegion.setRect( -h-y , x , h , w ) ;
	Name_writer.draw( g , newRegion ) ;
	g.setTransform( oldTransform ) ;
}

function writeTextOutlined( text , writer , region , stroke , g , sheet , diy ){
	debug( 3 , 'writeTextOutlined' ) ;
	
	var newRegion = String(region).split(',') ;
	var w = Number(newRegion[2]) ;
	var h = Number(newRegion[3]) ;
	
	var textImage = sheet.createTemporaryImage( w , h , true ) ;
	var gi = sheet.createGraphics( textImage , true , true ) ;
	
	writer.markupText = text ;
	writer.draw( gi , new Region([3,2,w-6,h-4]) ) ;
	
	var originalWidth = stroke.getWidth() ;
	if( (originalWidth*sheet.scalingFactor) < 1 ){
		debug( 1 , 'drawTextOutlined: bad width: '+originalWidth*sheet.scalingFactor) ;
		stroke.setWidth( 1 ) ;
	}else{ stroke.setWidth( originalWidth*sheet.scalingFactor ) ; }
	textImage = stroke.filter( textImage , null ) ;
	
	sheet.paintImage( g , textImage , region ) ;
	
	stroke.setWidth( originalWidth ) ;
}

function writeLineDecorated( text , writer , region , image , imageRegion , g , sheet ){
/*
Draws $key on the component template $key-region adding an image as background.
*/
	debug( 1 , 'writeLineDecorated' ) ;
	
	sheet.paintImage(
		g ,
		image ,
		imageRegion
	) ;
	writer.markupText = text ;
	writer.drawAsSingleLine( g , region ) ;
}

function writeType( g , diy ){
	if(  diy.settings.get( 'Type' , '' ) == '' ){
		if(( $Template == 'Ship' ) || ( $Template == 'ShipNightmare' ) || ( $Template == 'ShipBurden' ) || ( $Template == 'Upgraded' )){
			switch( Card ){
			case 'Enemy' : text = #LRL-ShipEnemy ; break ;
			case 'ObjectiveAlly' : text = #LRL-ShipObjective ; break ;
			}
		}else{ text = #('LRL-'+Card) ; }
	}else{ text = $Type ; }
	writeLine( 
		text , Type_writer , 
		diy.settings.getRegion( 'Type' ) , g 
	) ;
}
function writeOptionLeft( g , sheet , diy ){
//usar getRegion(d(parent, dx, dy, dw, dh))
	if ( $OptionLeft != '' ){
		writeLineDecorated(
			$OptionLeft , Option_writer , diy.settings.getRegion( 'OptionLeft' ) ,
			ImageUtils.get( ImagePath+'VictoryDecoration.jp2' ) , diy.settings.getRegion( 'OptionLeftDecoration' ) ,
			g , sheet 
		) ;
	}
}
function writeOptionRight( g , sheet , diy ){
	if ( $OptionRight != '' ){
		writeLineDecorated(
			$OptionRight , Option_writer , diy.settings.getRegion( 'OptionRight' ) ,
			ImageUtils.get( ImagePath+'VictoryDecoration.jp2' ) , diy.settings.getRegion( 'OptionRightDecoration' ) ,
			g , sheet 
		) ;
	}
}
function writeArtist( g , sheet , diy ){
	if( diy.settings.getBoolean( 'NoArtist' , false ) === true ) return;
	switch( $Artist ){
	case 'no' :
		text = '' ; 
		break ;
	case '' : 
		if( diy.settings.get( 'LRL-IllustratorUnknown' , '' ) != '' ) text = $LRL-IllustratorUnknown ; 
		else text = #LRL-IllustratorUnknown ; 
		break ;
	default : 
		if( diy.settings.get( 'LRL-IllustratorShort' , '' ) != '' ) text = $LRL-IllustratorShort+' '+$Artist ;
		else text = #LRL-IllustratorShort+' '+$Artist ;
	}
	writeTextOutlined( 
		'<left>'+text , Bottom_writer , 
		diy.settings.getRegion( 'Artist' ) , selectStroke( 'Bottom-stroke' , diy ) , 
		g , sheet , diy 
	) ;
}
function writeArtistBack( g , sheet , diy ){
	if( diy.settings.getBoolean( 'NoArtistBack' , false ) === true ) return;
	if( diy.settings.getBoolean( 'PortraitShare' , true ) === true ){
		switch( $Artist ){
		case 'no' :
			text = '' ; 
			break ;
		case '' : 
			if( diy.settings.get( 'LRL-IllustratorUnknown' , '' ) != '' ) text = $LRL-IllustratorUnknown ; 
			else text = #LRL-IllustratorUnknown ; 
			break ;
		default : 
			if( diy.settings.get( 'LRL-IllustratorShort' , '' ) != '' ) text = $LRL-IllustratorShort+' '+$Artist ;
			else text = #LRL-IllustratorShort+' '+$Artist ;
		}
		writeTextOutlined( 
			'<left>'+text , Bottom_writer , 
			diy.settings.getRegion( 'Artist' ) , selectStroke( 'Bottom-stroke' , diy ) , 
			g , sheet , diy 
		) ;
	}else{
		switch( $ArtistBack ){
		case 'no' :
			text = '' ; 
			break ;
		case '' : 
			if( diy.settings.get( 'LRL-IllustratorUnknown' , '' ) != '' ) text = $LRL-IllustratorUnknown ; 
			else text = #LRL-IllustratorUnknown ; 
			break ;
		default : 
			if( diy.settings.get( 'LRL-IllustratorShort' , '' ) != '' ) text = $LRL-IllustratorShort+' '+$ArtistBack ;
			else text = #LRL-IllustratorShort+' '+$ArtistBack ;
		}
		writeTextOutlined( 
			'<left>'+text , Bottom_writer , 
			diy.settings.getRegion( 'Artist' ) , selectStroke( 'Bottom-stroke' , diy ) , 
			g , sheet , diy 
		) ;
	}
}
function writeCopyright( g , sheet , diy ){
	if( diy.settings.getBoolean( 'Asterisk' , false ) === true ) {
		sheet.paintImage( g , diy.settings.getImageResource( 'AsteriskImage' ) , checkKey( 'Asterisk-region' ) ) ;
	}

	if( diy.settings.getBoolean( 'NoCopyright' , false ) === true ) return;
	writeTextOutlined( 
		diy.settings.get( 'Copyright' , '' ) , Bottom_writer , 
		diy.settings.getRegion( 'Copyright' ) , selectStroke( 'Bottom-stroke' , diy ) , 
		g , sheet , diy 
	) ;
}
function writeCopyrightBack( g , sheet , diy ){
	if( diy.settings.getBoolean( 'AsteriskBack' , false ) === true ) {
		sheet.paintImage( g , diy.settings.getImageResource( 'AsteriskImage' ) , checkKey( 'Asterisk-region' ) ) ;
	}

	if( diy.settings.getBoolean( 'NoCopyrightBack' , false ) === true ) return;
	writeTextOutlined( 
		diy.settings.get( 'Copyright' , '' ) , Bottom_writer , 
		diy.settings.getRegion( 'Copyright' ) , selectStroke( 'Bottom-stroke' , diy ) , 
		g , sheet , diy 
	) ;
}
function writeCollectionInfo( g , sheet , diy ){
	writeTextOutlined( 
		'<right>'+diy.settings.get( 'CollectionInfo' , '' ) , Bottom_writer , 
		diy.settings.getRegion( 'CollectionInfo' ) , selectStroke( 'Bottom-stroke' , diy ) , 
		g , sheet , diy 
	) ;
}
function writeCollectionNumber( g , sheet , diy ){
	if( $CollectionNumberCustomOverwrite ) text = $CollectionNumberCustomOverwrite ;
	else if( $CollectionNumberCustom ) text = $CollectionNumberCustom ;
	else text = $CollectionNumber ;
	writeTextOutlined(
		'<left>'+text , Bottom_writer ,
		diy.settings.getRegion( 'CollectionNumber' ) , selectStroke( 'Bottom-stroke' , diy ) ,
		g , sheet , diy
	) ;
}
function writeCollectionNumberBack( g , sheet , diy ){
	if( $CollectionNumberCustomOverwriteBack ) text = $CollectionNumberCustomOverwriteBack ;
	else if( $CollectionNumberCustom ) text = $CollectionNumberCustom ;
	else text = $CollectionNumber ;
	writeTextOutlined(
		'<left>'+text , Bottom_writer ,
		diy.settings.getRegion( 'CollectionNumber' ) , selectStroke( 'Bottom-stroke' , diy ) ,
		g , sheet , diy
	) ;
}

function uiParagraph( key , bindings , size , sides ){
/*
Returns a user interface textArea. Value will be initialized and binded
to $key. Area "size" defaults to regular card text box size. Component
"sides" will be updated on control edit.
*/
	if( sides == null ) sides = [ FRONT , BACK ] ;
	if( size == null ) size = 'medium' ;
	debug( 1 , 'uiParagraph: '+key ) ;

	switch( String( size ) ){
	case 'small' : lines = 3 ; columns = 50 ; break ;
	case 'medium' : lines = 6 ; columns = 50 ; break ;
	case 'big' : lines = 10 ; columns = 50 ; break ;
	case 'huge' : lines = 20 ; columns = 50 ; break ;
	}

	var uiControl = new textArea( $( key ) , lines , columns , true ) ;
	bindings.add( key , uiControl , sides ) ;
	return uiControl ;	
}

function writeParagraph( parts , writer , region , g , diy ){ 
/*
Draws a text paragraph composed by "partsArray", formatting each part
based on specific settings and user preferences.
In some cards, differently formated texts can be found in the same text box. 
For example, an Ally has Trait, Rules and Flavour text writen in the same
text space, each with it's own format (bold, italics and size). Also, 
each parts' text size should be reduced equally if needed to fit in the box.
Instead of forcing the user to add format tags for each part, a text user
interface control is added for each part, and when card will be painted
format tags are added for each part and then every part is put togheter and
written.
*/
	if( parts == null ) parts = new Array( 'Rules' ) ;
	debug( 1 , 'writeParagraph' ) ;

	var text = '' ;
	for( var index in parts ){
		if( diy.settings.get( parts[ index ] , '' ) != '' ){
			if( text != '' ) text = text+'\n<vs>\n' ; 
			var format = diy.settings.get( 'LRL-'+parts[index]+'-format' , diy.settings.get( parts[index]+'-format' , '' ) ) ;
			var formatEnd = diy.settings.get( 'LRL-'+parts[index]+'-formatEnd' , diy.settings.get( parts[index]+'-formatEnd' , '' ) ) ;
			text = text+format+diy.settings.get(parts[index])+formatEnd ;
		}
	}
	writer.setMarkupText( text ) ;
	updateNameTags( writer , diy ) ;
	let measuredHeight = writer.measure( g , region ) ;
	let array = String(region).split(',') ;
	debug( 1 , 'Paragraph region height: '+array[3] ) ;
	debug( 1 , 'Paragraph write measure: '+measuredHeight ) ;
	if( parseFloat(measuredHeight) > parseFloat(array[3]) ){
		diy.settings.set('TextOverflow', 1);
	}
	writer.draw( g , region ) ;
	
}
function writeBody( parts , g , diy ){
	if( diy.settings.getBoolean('TraitOut') ){
		const index = parts.indexOf( 'Trait' ) ;
		if (index > -1) {
			writeParagraph( 
				[ 'Trait' ] , Body_writer , 
				diy.settings.getRegion( 'TraitOut-Trait' , diy.settings.getRegion( 'Body' ) ) , g , diy 
			) ;
			parts.splice( index, 1 ) ;
			writeParagraph( 
				parts , Body_writer , 
				diy.settings.getRegion( 'TraitOut-Body' , diy.settings.getRegion( 'Body' ) ) , g , diy 
			) ;
		}else{
			writeParagraph( 
				parts , Body_writer , 
				diy.settings.getRegion( 'Body' ) , g , diy 
			) ;
		}
	}else{
		writeParagraph( 
			parts , Body_writer , 
			diy.settings.getRegion( 'Body' ) , g , diy 
		) ;
	}
}

function uiTransparency( key , bindings , sides ){
/*
Creates a user interface slider for body icon transparency setting.
*/
	if( sides == null ) sides = [ FRONT , BACK ] ;
	debug( 1 , 'uiTransparency: '+key ) ;

	var uiControl = new slider( 1 , 10 , 5 , [ 1 , @LRL-High , 4 , @LRL-Medium , 7 , @LRL-Low , 10 , @LRL-Opaque ] , null ) ;
	bindings.add( key+'-transparency' , uiControl , sides ) ;
	return uiControl ;	
}

function uiTint( key , bindings , sides ){
/*
Creates a user interface tint selection panel.
I have a working implementation. Look for it when the update is posted.

Here is the code of the demo I'll add to the authoring kit:

//
// tint-presets.js - version 1
//
// This script uses a DIY component to demonstrate how to add a list of
// preset tint settings to the controls for a tintable element.
// Run from the code editor window or by right clicking in the project pane.
//

useLibrary( 'diy' );
useLibrary( 'ui' );
useLibrary( 'imageutils' );

function create( diy ) {
	diy.faceStyle = FaceStyle.ONE_FACE;
	$tintValue = '0,1,1'; // note that this will match the "Enraged" preset
	$peacefulPreset = '-60,0.43,0.78';
}

function createInterface( diy, editor ) {
	let panel = new Stack();
	hsbPanel = tintPanel();

	// define the preset tint values to use
	// (the user can still choose a custom tint if they wish)
	hsbPanel.setPresets(
		'Peaceful', $peacefulPreset, // preset values can be set from setting value
		'Enraged',  '0,1,1',         //   or just a string that uses the setting value format
		'Toxic',    [0.34,1,1]       //   or an array [h,s,b] with h=angle/360
	);

	panel.add( hsbPanel );

	let bindings = new Bindings( editor, diy );
	bindings.add( 'tintValue', hsbPanel );
	panel.addToEditor( editor, 'Tint Presets Demo' );
	bindings.bind();
}

let tintable; // the image we will tint

function createFrontPainter( diy, sheet ) {
	tintable = ImageUtils.create( 100, 100 );
	let g = tintable.createGraphics();
	try {
		g.setPaint( Colour.RED );
		g.fillRect( 0, 0, tintable.width, tintable.height );
		g.setPaint( Colour.BLACK );
		g.drawRect( 0, 0, tintable.width-1, tintable.height-1 );
	} finally {
		if(g) g.dispose();
	}
}

function paintFront( g, diy, sheet ) {
	sheet.paintTemplateImage( g );
	let hsb = $$tintValue.tint;
	let tinted = ImageUtils.tint( tintable, hsb );
	g.drawImage( tinted,
		(sheet.templateWidth-tintable.width)/2,
		(sheet.templateHeight-tintable.height)/2,
		null
	);

	// don't ask about unsaved changes when
	// the demo window is closed
	diy.markSaved();
}

function createBackPainter( diy, sheet ) {}
function paintBack( g, diy, sheet ) {}
function onClear() {}
function onRead() {}
function onWrite() {}

testDIYScript();
*/

	if( sides == null ) sides = [ FRONT , BACK ] ;
	debug( 1 , 'uiTint: '+key ) ;
	
	function getTint( key ){
		var tint = settingToArray( key+'-tint' ) ;
		tint = new Array( Number(tint[0])/360 , Number(tint[1]) , Number(tint[2]) ) ;
		return tint ;
	}

	importClass( ca.cgjennings.apps.arkham.HSBPanel ) ;
	var uiControl = new HSBPanel() ;
 	uiControl.setPresets(
 		@LRL-Neutral , getTint( 'Neutral' ) ,
 		@LRL-Leadership , getTint( 'Leadership' ) ,
		@LRL-Lore , getTint( 'Lore' )  ,
		@LRL-Spirit , getTint( 'Spirit' )  ,
		@LRL-Tactics , getTint( 'Tactics' )  ,
		@LRL-Fellowship , getTint( 'Fellowship' )  ,
		@LRL-Baggins , getTint( 'Baggins' )  ,
		@LRL-Mastery , getTint( 'Mastery' )
	) ;
 	bindings.add( key+'-tint' , uiControl , sides ) ;
	return uiControl ;	
}

// User interface controls
//function iconListComboBox( list ){
///*
//Creates a user interface list containing the icons and names
//refered in "list".
//Creates an icon suitable for the user interface from the
//plugin ui folder's "name" PNG file.
//Icon size depends on the plugin's "uiIconSize" setting.
//*/
//	if( list == null  ){ list == new Array( 'null' ) ;
//		debug( 1 , "iconListComboBox: list not defined." ) ;
//		return ;
//	}else{
//		debug( 1 , 'iconListComboBox: '+list ) ;
//	}
//
//	var combo = new Array() ;
//	for(
//		let index = 0 ;
//		index < list.length ;
//		index++
//	){
//		let name = list[ index ] ;
//		combo[ index ] = ListItem(
//			name ,
//			@('LRL-'+name) ,
//			uiIcon( name )
//		) ;
//	}
//
//	return new comboBox( combo , null ) ;
//}

function uiIcon( name ){
/*
Creates a user interface icon from the
plugin ui folder's "name" PNG file.
Icon size depends on the plugin's "uiIconSize" setting.
*/
	debug( 1 , 'uiIcon: '+name ) ;
	if( ImageUtils.get( UiPath+name+'.png' , false , true ) != null ) icon = ImageUtils.createIcon( ImageUtils.get( UiPath+name+'.png' , false ) , IconSize , IconSize ) ;
	else icon = ImageUtils.createIcon( ImageUtils.get( IconPath+name+'.png' , false ) , IconSize , IconSize ) ;
	
	return icon ;
}

function uiButtonIcon( key , diy , bindings , sides ){
/*
Creates a toggle button with an icon from the
plugin ui folder's "key" PNG file.
Requires passing diy.
Icon size depends on the plugin's "uiIconSize" setting.
*/
	if( sides == null ) sides = [ FRONT , BACK ] ;
	debug( 1 , 'uiButton: '+key ) ;

	var uiControl = new toggleButton( '' , uiIcon( key ) , diy.settings.getBoolean( key , false ) , null ) ;
	bindings.add( key , uiControl , sides ) ;
	
	return uiControl ;
}

function uiButtonText( key , diy , bindings , sides ){
/*
Creates a toggle button with a text from the.
*/
	debug( 1 , 'uiButtonText' ) ;
	var button = new toggleButton( @('LRL-uiButtonText-'+key) , '' , diy.settings.getBoolean( key , false ) , null ) ;
	bindings.add( key , button , [ 0 , 1 ] ) ;
	return button ;
}
//
//function uiOptionSpecial( key , diy , bindings , sides ){
///*
//Creates a toggle button with an icon from the
//plugin ui folder's "key" PNG file.
//Requires passing diy.
//Icon size depends on the plugin's "uiIconSize" setting.
//*/
//	debug( 1 , 'uiOptionSpecial: '+key ) ;
//	var combo = new Array(
//		ListItem( 'none' , @LRL-None , ImageUtils.createIcon( ImageUtils.get( UiPath+'Empty.png' ) , IconSize , IconSize ) ) ,
//		ListItem( 'Sailing' , @LRL-Sailing , ImageUtils.createIcon( ImageUtils.get( UiPath+'Sailing.png' ) , IconSize , IconSize ) ) ,
//		ListItem( 'EyeOfSauron' , @LRL-EyeOfSauron , ImageUtils.createIcon( ImageUtils.get( UiPath+'EyeOfSauron.png' ) , IconSize , IconSize ) ) ,
//		ListItem( 'EyeOfSauron2' , @LRL-EyeOfSauron+' x2' , ImageUtils.createIcon( ImageUtils.get( UiPath+'EyeOfSauron2.png' ) , IconSize , IconSize ) ) ,
//		ListItem( 'EyeOfSauron3' , @LRL-EyeOfSauron+' x3' , ImageUtils.createIcon( ImageUtils.get( UiPath+'EyeOfSauron3.png' ) , IconSize , IconSize ) ) ,
//		ListItem( 'EyeOfSauron4' , @LRL-EyeOfSauron+' x4' , ImageUtils.createIcon( ImageUtils.get( UiPath+'EyeOfSauron4.png' ) , IconSize , IconSize ) )
//	) ;
//	
//	bindings.add( key , combo , [ 0 , 1 ] ) ;
//	return combo ;
//}
//
//function getCollections(){
///* getCollections()
//	This function returns an array with the available Collections.
//	Check LRL-I settings file for information on how to add new icons
//	to this list.
//*/
//	debug( 1 , 'getCollections: ' ) ;
//	//var collectionsList = settingToArray( 'collectionsList' ) ;
//
//	var collections = new Array() ;
//	for(
//		let index = 0 ;
//		index < GO.GameCollectionList.length ;
//		index++
//	){
//		let item = GO.GameCollectionList[ index ] ;
//		collections = collections.concat(
//			settingToArray( item+'-Collection-list' )
//		) ;
//	}
//	return collections ;
//}
//
//function getEncounterSets(){
///* getEncounterSets()
//	This function returns an array with the available Collections.
//	Check LRL-I settings file for information on how to add new icons
//	to this list.
//*/
//	debug( 1 , 'getEncounterSets: ' ) ;
//
//	var collections = getCollections() ;
//	var sets = new Array() ;
//
//	for(
//		let index = 0 ;
//		index < collections.length ;
//		index++
//	){
//		let item = collections[ index ] ;
//		sets = sets.concat(
//			settingToArray( item+'-EncounterSet-list' )
//		) ;
//	}
//
//	return sets;
//}

function uiEncounterSetList(){
/*
This function creates a user interface selection list with the available
Encounter Set icons.
*/
	debug( 1 , 'uiEncounterSetList: '+key ) ;
	var list = GO.defaultIconList.concat( getEncounterSets() ) ;

	return uiIconList( list ) ;
}

function paintSpecialOption( key , g , diy , sheet ){
	debug( 1 , 'paintSpecialOption: '+key ) ;
	var item = $( key ) ;
	if( item != 'Empty' ){
		sheet.paintImage( 
			g , 
			ImageUtils.get( IconPath+item+'.png' ) , 
			key+'-region'
		) ;
	}
}

function paintIcon( key , g , diy , sheet ){
/*
This paints an icon in the component. The icon position to paint is
determined by the 'key' and the actual image to paint is determined by $key.
The icon is looked for in the plugin ui folder's, as "key" PNG file.
It will also look for Nightmare and Draft variants if needed.
*/
	debug( 1 , 'paintIcon: '+key ) ;
	var item = String( $( key ) ) ;
	switch( item ){
	case 'Empty' :
		break ;
	case 'Custom' :
		//PortraitList[ portraitIndexOf( key ) ].paint( g , sheet.getRenderTarget() ) ;
		sheet.paintImage( 
			g , 
			PortraitList[ portraitIndexOf( key ) ].getImage() , 
			checkKey( key+'-portrait-clip-region' ) 
		) ;
		break ;
	default :
		if( ( $Template == 'Nightmare' ) && ( key == 'EncounterSet' ) ){
			var NightmareIcon = ImageUtils.get( IconPath+item+'-Nightmare.png' , false, true ) ;
			if( NightmareIcon == null ){
				NightmareIcon = ImageUtils.get( IconPath+item+'.png' ) ;
				NightmareIcon = ImageUtils.invert( NightmareIcon ) ;
			}
			sheet.paintImage( g , NightmareIcon , checkKey( key+'-portrait-clip-region' ) ) ;
		}else{
			sheet.paintImage( g , ImageUtils.get( IconPath+item+'.png' ) , checkKey( key+'-portrait-clip-region' ) ) ;
		}
	}
}

function getIcon( key ){
	debug( 1 , 'getIcon: '+key ) ;
	var item = String( $( key , 'Empty' ) ) ;
	switch( item ){
		case 'Empty' : return ImageUtils.get( ImagePath+'empty1x1.png' ) ; break ;
		case 'Custom' : return PortraitList[ portraitIndexOf( key ) ].getImage() ; break ;
		default :
			var image = ImageUtils.get( IconPath+item+'.png' ) ;
			if( ( key == 'EncounterSet' ) && ( $Template == 'Nightmare' ) ) return ImageUtils.invert( image ) ;
			else return image ;
	}
}

function paintLogo( g , diy , sheet ){
	debug( 1 , 'paintLogo' ) ;
	switch( getLocale() ){
	case 'es' : image =  'logo-LRL-es.jp2' ; break ;
	//case 'fr' : image = 'logo-LRL-fr.jp2' ; break ;
	case 'pl' : image = 'logo-LRL-pl.jp2' ; break ;
	default : image = 'logo-LRL.jp2' ; break ;
	}
	sheet.paintImage( g , ImageUtils.get( CardPath+image ) , 'GameLogo' ) ;
}


/* PORTRAIT related code */

function createPortrait( key , diy ){
/*
This function returns Portrait that allows user to change 
and manipulate an external image to be used in the component.		
Use only the key without the "Card" type.
*/
	debug( 1 , 'createPortrait: '+key ) ;
	var index = PortraitList.length ;
	PortraitList[ index ] = new DefaultPortrait( diy , key , false ) ;
	PortraitList[ index ].backgroundFilled = false ;
//	if( diy.settings.get( Card+'-'+key+'-stencil' , null ) != null ){
//		PortraitList[ index ].setClipStencil(
//			ImageUtils.get( Card+'-'+key+'-stencil' )
////			ca.cgjennings.apps.arkham.component.AbstractPortrait.createStencil(
////				ImageUtils.get( Card+'-'+key+'-stencil' ) , 
////				diy.settings.getRegion( Card+'-'+key+'-portrait-clip-region' )
////			)
//		) ;
//		PortraitList[ index ].setClipping(true)
//	}
	debug( 2 , '    '+key+'-portrait-clip-region: '+$(key+'-portrait-clip-region') ) ;
	debug( 2 , '    '+key+'-portrait-template: '+$(key+'-portrait-template') ) ;
	debug( 2 , '    '+key+'-portrait-scale: '+$(key+'-portrait-scale') ) ;
	debug( 2 , '    '+key+'-portrait-panx: '+$(key+'-portrait-panx') ) ;
	debug( 2 , '    '+key+'-portrait-pany: '+$(key+'-portrait-pany') ) ;
	debug( 2 , '    '+key+'-portrait-rotation: '+$(key+'-portrait-rotation') ) ;

	PortraitList[ index ].installDefault() ;
	debug( 1 , '    '+PortraitList[ index ] ) ;
	debug( 1 , '    '+PortraitList[ index ].getBaseKey() ) ;
}

function createLinkedPortrait( key ){
/*
This function returns Portrait that allows user to change 
and manipulate an external image to be used in the component.
This instance is linked to the Main portrait, and they will
share the image. It's used to show the same picture, but in
a different component region. For example in LRL plugin, it's 
used to load the Main portrait on Promotional Hero template.		
Use only the key without the "Card" type.
*/
	debug( 1 , 'createLinkedPortrait: '+key ) ;
	var index = PortraitList.length ;
	PortraitList[ index ] = new DefaultPortrait( portraitIndexOf( 'Main' ) , Card+'-'+key ) ;
	PortraitList[ index ].backgroundFilled = false ;
	PortraitList[ index ].installDefault() ;
}

function uiPortrait( key , diy ){
/*
This function returns a user interface portraitPanel that
allows user to change and manipulate an external image to be
used in the component. It's also used to load external images
on some non-manipulable component places, like Collection icon.
Use only the key without the "Card" type.
*/
	debug( 1 , 'uiPortrait: '+portraitIndexOf( key )+' '+key ) ;
	var uiControl = new portraitPanel( 
		diy , 
		portraitIndexOf( key ) , 
		@('LRL-'+key+'-uiPortrait') 
	) ;
	return uiControl ;
}

function uiPortraitMirror( key , control ){
/*
This function creates a user interface button used to
mirror horizontally a Portrait control of the component.
*/
	debug( 1 , 'uiPortraitMirror' ) ;
	var button = new repeaterButton(
		@LRL-uiPortraitMirror ,
		'' ,
		function(){
			var panel = portraitIndexOf( key ) ;
			var scale = PortraitList[ panel ].getScale() ;
			var panX = PortraitList[ panel ].getPanX() ;
			var panY = PortraitList[ panel ].getPanY() ;
			PortraitList[ panel ].setImage(
				PortraitList[ panel ].getSource(),
				ImageUtils.mirror( PortraitList[ panel ].getImage() , true , false )
			);
			PortraitList[ panel ].setScale( scale ) ;
			PortraitList[ panel ].setPanX( panX ) ;
			PortraitList[ panel ].setPanY( panY ) ;

			control.updatePanel() ;
		}
	) ;
	return button ;
}

function uiCycler( key , values , bindings , sides ){
/*
This function creates a user interface button used to
select which identifing elements are shown in the card.
It's used only in "Divider" and "DividerHorizontal".
*/
	debug( 1 , 'uiCycler' ) ;
	if( sides == null ) sides = [ FRONT , BACK ] ;
	
	let labels = new Array() ;
	for( index in values){
		labels[ index ] = @('LRL-uiCycler-'+values[ index ]) ;
	}
	var button = new cycleButton( labels , values ) ;
	bindings.add( key , button , sides ) ;
	return button ;
}

function portraitIndexOf( key ){
/*
Returns the portrait index of the panel built with key.
Use only the key without the "Card" type.
*/
	//debug( 1 , 'portraitIndexOf: '+key ) ;
	for( var index in PortraitList ){
		var currentKey = PortraitList[ index ].getBaseKey() ;
		if( currentKey == key ){
			return index ; 
		}
	}
	return null ;
}

function paintPortrait( key , g , diy , sheet ){
	debug( 1 , 'paintPortrait: '+key ) ;
	if( ( typeof( SE2CARD ) != 'undefined' ) && ( key == 'Main' ) ){
		debug( 0 , 'paintPortrait: SE2CARD' ) ;
		sheet.paintPortrait( g ) ;
	}else{ 
		index = portraitIndexOf( key ) ;
//		if( $( key+'-external-path' ) != '' ){
//			debug('load external Portrait') ;
//			
//			PortraitList[ index ].setImage( 
//				$( key+'-external-path' ) , 
//				diy.settings.getImageResource( 
//					key+'-external-path' 
//				) 
//			) ;
//			if( $( key+'-external-panx' ) != '' ) PortraitList[ index ].setPanX( $( key+'-external-panx' ) ) ;
//			if( $( key+'-external-pany' ) != '' ) PortraitList[ PORTRAIT ].setPanY( $( key+'-external-pany' ) ) ;
//			if( $( key+'-external-scale' ) != '' ) PortraitList[ PORTRAIT ].setScale( $( key+'-external-scale' ) ) ;
//		}
		PortraitList[ index ].paint( g , sheet.getRenderTarget() ) ; 
	}
}

function paintPortraitDraft( key , g , sheet ){	
	debug( 1 , 'paintPortraitDraft: '+key ) ;
	var imageTinted = PortraitList[ portraitIndexOf( key ) ].getImage() ;
	var imagePanX = PortraitList[ portraitIndexOf( key ) ].getPanX() ;
	var imagePanY = PortraitList[ portraitIndexOf( key ) ].getPanY() ;
	var imageRotation = PortraitList[ portraitIndexOf( key ) ].getRotation() ;
	var imageScale = PortraitList[ portraitIndexOf( key ) ].getScale() ;
	imageTinted = createHCImage( imageTinted ) ;
	var region = settingToArray( checkKey( key+'-portrait-clip-region' ) , 'number' ) ;
	var AT = java.awt.geom.AffineTransform ;	
	var transform =	AT.getTranslateInstance(
			Number( region[ 0 ] )+( Number( region[ 2 ] )/2 )+imagePanX-( ( imageTinted.width*imageScale )/2 ) ,
			Number( region[ 1 ] )+( Number( region[ 3 ] )/2 )+imagePanY-( ( imageTinted.height*imageScale )/2 )
		) ;
	transform.concatenate( AT.getScaleInstance( imageScale, imageScale ) ) ;
	transform.concatenate(
		AT.getRotateInstance(
			-imageRotation * Math.PI/180 ,
			imageTinted.width/2 ,
			imageTinted.height/2 
		) 
	) ;
	g.drawImage( imageTinted, transform, null ) ;
}

function getPortraitCount(){
/*
Returns the portrait count.
*/
	//debug( 1 , 'getPortraitCount' ) ;
	return PortraitList.length ;
}

function getPortrait( index ) {
/*
Returns the portrait given by index.
*/
	//debug( 1 , 'getPortrait: '+key ) ;
	if( ( index < 0 ) || ( index >= PortraitList.length ) ){ 
		throw new Error('getPortrait: Invalid portrait index: '+index) ;
	}
	return PortraitList[ index ] ;
}

// Following filters are used on portrait elements
const createHCImage = filterFunction(
	new ca.cgjennings.graphics.filters.CompoundPixelwiseFilter( [
		new ca.cgjennings.graphics.filters.GreyscaleFilter() ,
		new ca.cgjennings.graphics.filters.BrightnessContrastFilter( 0.3 , 0.5 )
	] )
) ;

const createRedishImage = filterFunction(
	new ca.cgjennings.graphics.filters.CompoundPixelwiseFilter( [
		new ca.cgjennings.graphics.filters.GreyscaleFilter() ,
		//new ca.cgjennings.graphics.filters.BrightnessContrastFilter( -0.2 , 0.2 ) ,
		new ca.cgjennings.graphics.filters.GammaCorrectionFilter( 1.5 , 0.5 , 0.5 )
	] )
) ;

const createSepiaImage = filterFunction(
	new ca.cgjennings.graphics.filters.CompoundPixelwiseFilter( [
		new ca.cgjennings.graphics.filters.GreyscaleFilter() ,
		new ca.cgjennings.graphics.filters.GammaCorrectionFilter( 1.5 , 1 , 0.5 )
	] )
) ;
/* NUMERIC CONTROLS */
function uiSpinner( key , bindings , limit , sides ){
	if( sides == null ) sides = [ FRONT , BACK ] ; 
	if( limit == null ) limit = 999 ;
	debug( 1 , 'uiSpinner: '+key ) ;

	var uiControl = new spinner( 0 , limit , 1 , 0 , null ) ;
 	bindings.add( key , uiControl , sides ) ;
	return uiControl ;	
}
function uiStat( key , bindings , limit , extra , sides ){
/*
Creates a user interface list containing numbers up to
"limit" and may adds a fex extra items depending on "extra".
list is binded to $key, and updates the component "sides". 
*/
	importClass( arkham.diy.ListItem ) ;
	if( sides == null ) sides = [ FRONT , BACK ] ;
	if( limit == null ) limit = 99 ;
	if( extra == null ) extra = true ;
	debug( 1 , 'uiStat: '+key ) ;

	var combo = new Array() ;
	let index = 0 ;
	do{
		combo[ index ] = ListItem( index , String( index ) ) ;
		index++ ;
	}while( index <= limit )

	if( extra == true ){
		combo[ combo.length ] = ListItem( 'X' , 'X' ) ;
		combo[ combo.length ] = ListItem( 'minus' , '-' ) ;
		combo[ combo.length ] = ListItem( 'empty1x1' , @LRL-Empty ) ;
	}
	var uiControl = new comboBox( combo , null ) ;
	bindings.add( key , uiControl , sides ) ;
	return uiControl ;
}

function paintStatTinted( key , tinter , g , sheet ){
/* 
This function tints and paints the "key" stat.
Used for colored stats like HitPoints.
*/
	debug( 1 , 'paintStatTinted: '+key ) ;
	var image = ImageUtils.get( ImagePath+'number-tintable/'+$( key )+'.png' ) ;
	tinter.setImage( image ) ;
	sheet.paintImage( g , tinter.getTintedImage() , key+'-region' ) ;
}

function paintStat( key , g , sheet ){
/*
This function paints the "key" stat using a image.
Used for plain black stats like Attack.
*/
	debug( 1 , 'paintStat: '+key ) ;
	var image = ImageUtils.get( ImagePath+'number/'+$( key )+'.png' ) ;
	sheet.paintImage( g , image , key+'-region' ) ;
}

function paintDifficulty( color, template, g , sheet ){
/*
This function paints a difficulty ring using an image.
*/
	debug( 1 , 'paintDifficulty: ' + template + ' - ' + color ) ;
	var image = ImageUtils.get( ImagePath + 'custom-difficulty/Custom-Difficulty-' + template + '-' + color + '.png' ) ;
	sheet.paintImage( g , image , 'Difficulty-region' ) ;
}

/* OTHER GRAPHIC STUFF */

function paintTemplate( g , sheet ){
/*
This funtion draws the base image selected by $template.
Note this is different from using the basic paintTemplateImage.
*/
	debug( 1 , 'paintTemplate: '+$Template ) ;
	sheet.paintImage( g, $Template+'-template', 'Template' ) ;
}

function paintCut( g , diy , sheet ){
	debug( 1 , 'paintCut' ) ;
	if( diy.settings.getBoolean( 'ShowBleeding' ) == true ){
		sheet.paintImage( g, 'PokerCard-bleeding', 'Template' ) ;
	}
	if( diy.settings.getBoolean( 'ShowCutBigger' ) == true ){
		sheet.paintImage( g, 'PokerCard-cutBig', 'Template' ) ;
	}
	if( diy.settings.getBoolean( 'ShowCut' ) == true ){
		sheet.paintImage( g, 'PokerCard-cut', 'Template' ) ;
	}
}

function paintCustomSphereBody( tint , g , diy , sheet ){ //obsoleto
/*
This function paints the tinted text box and custom sphere icon for the rules text.
*/	
	CustomSphereBody_tinter.setFactors( tint[0] , tint[1] , tint[2] ) ;
	sheet.paintImage( g , CustomSphereBody_tinter.getTintedImage() , 'Template' ) ;

	if(CustomSphereBodyIcon_tinter){	
		CustomSphereBodyIcon_tinter.setFactors( tint[0] , tint[1] , tint[2] ) ;
		CustomSphereBodyIcon_tinter.setImage( PortraitList[ portraitIndexOf( 'BodyIcon' ) ].getImage() ) ;
		sheet.paintImage( g , ImageUtilities.alphaComposite( BodyIcon_tinter.getTintedImage() , Number($BodyIcon-transparency)/10 ) , 'BodyIcon-portrait-clip-region' ) ;
	}
}

function paintCustomSphereColour( tint , g , diy , sheet ){ //obsoleto
/*
This function paints the small tinted sphere decorations.
*/	
	debug( 1 , 'paintSphereColour' ) ;
	CustomSphereColour_tinter.setFactors( tint[0] , tint[1] , (tint[2]/3)+0.67 ) ; // mover a listener
	sheet.paintImage( g , CustomSphereColour_tinter.getTintedImage() , 'Template' ) ;
}

function createTinterVariable( pathToImage , diy ){// obsoleto
/*
This function creates a TintCache with a fixed image
and variable tint. Tint is modified during paint.
Used for card decorations like Easy Mode identifier.
It's used also for CustomTemplates, passing the portrait
during paint. In this cases, use null as pathToImage.
*/
	if( pathToImage == null) pathToImage = $EmptyImage ;
	debug( 1 , 'createTinterVariable: '+pathToImage ) ;
	
	var tinter = new TintCache( new TintFilter() , ImageUtils.get( pathToImage ) ) ;
	
	return tinter ;
}

function createTinter( key , diy ){
/*
This function creates a TintCache. TintCaches are functions that
take a image and colorize them to use, for example, in stats like
HitPoints and Progress. The source image is the same for both stats,
but it is colorized through the TintCache. Initial tint color is defined by
$key-tint and source image by $key-tintable. These elements may change
in the paintFront/Back functions.
*/

	debug( 1 , 'createTinter: '+key ) ;
	
	if( diy.settings.get( key+'-tintable' ) == null) image = diy.settings.getImageResource( 'EmptyImage' ) ;
	else image = diy.settings.getImageResource( key+'-tintable' ) ;
	var tinter = new TintCache( new TintFilter() , image ) ;
	
	if( diy.settings.get( key+'-tint' ) == null) tint = diy.settings.getTint( 'Custom' ) ;
	else tint = diy.settings.getTint( key ) ;
	tinter.setFactors( tint[0] , tint[1] , tint[2] ) ;

	return tinter ;
}

function filterFunction( filter ){
	var f = function filter( source ){ return filter.filter.filter( source , null ) ; } ;
	f.filter = filter ;
	return f ;
}

/* OTHER STUFF */

function loadSettings( diy ){ //revisar
/*
This function is called on new component creation.
It loads default component settings for regions that
define text and image positions, or text format.
*/
	debug( 1 , 'loadSettings' ) ;
	if( sourcefile == 'Quickscript' ){
		diy.settings.addSettingsFrom( 'project:TheLordOfTheRingsLCG/resources/'+CardPath+'component.settings' ) ;
	}else{
		diy.settings.addSettingsFrom( CardPath+'component.settings' ) ;
	}
}
function loadExample( diy ){ //revisar
/*
This function is called on new component creation.
It loads example component settings and localized strings.
Then, it loads the settings from the plugin preferences.
*/
	debug( 1 , 'loadExample' ) ;
	if( sourcefile == 'Quickscript' ){
		diy.settings.addSettingsFrom( 'project:TheLordOfTheRingsLCG/resources/'+CardPath+'example.settings' ) ;
		diy.settings.addSettingsFrom( 'project:TheLordOfTheRingsLCG/resources/'+CardPath+'example.properties' ) ;
	}else{
		diy.settings.addSettingsFrom( CardPath+'example.settings' ) ;
		var locale = getLocale() ;
		diy.settings.addSettingsFrom( CardPath+'example.properties' ) ;
		if( locale != 'en' ){
			try{ diy.settings.addSettingsFrom( CardPath+'example_'+locale+'.properties' ) ;
			}catch( err ){ throw new Error(Card+' '+@LRL-error-ExampleNotLocalized) ; }
		}
	}

// Default values from preferences
	if( $LRL-Copyright != '' ) $Copyright = diy.settings.get( 'LRL-Copyright' , '\u00a9FFG \u00a9Middle-earth' ) ;
	if( $LRL-CollectionInfo != '' ) $CollectionInfo = diy.settings.get( 'LRL-CollectionInfo' , '' ) ;
	
	if( $LRL-Collection != '' ) $Collection = diy.settings.get( 'LRL-Collection' , 'StrangeEonsIcon' ) ;
	if( $LRL-Collection == 'CustomIcon' ) diy.settings.set( 'Collection-portrait-template' , diy.settings.get( '$LRL-CollectionUser' , 'TheLordOfTheRingsLCG/ui/Empty.png' ) ) ;

	if( $LRL-Copyright != '' ) $EncounterSet = diy.settings.get( 'LRL-EncounterSet' , 'StrangeEonsIcon' ) ;
	if( $LRL-EncounterSet == 'CustomIcon' ) diy.settings.set( 'EncounterSet-portrait-template' , diy.settings.get( '$LRL-EncounterSetUser' , 'TheLordOfTheRingsLCG/ui/Empty.png' ) ) ;

}

function paintDividerCommon( g , diy , sheet ){ // obsoleto
/*
	This function paints all the stuff that is the same in both sides of the component,
*/
	paintPortrait( 'Portrait' , g , sheet ) ;
	
// TEMPLATE
	var hsb;
	switch( String($Template) ){
	case 'CustomDifficulty':
	case 'CustomSphere':
		hsb = diy.settings.getTint( 'Template-tint' ) ;
		Template_tinter.setFactors( hsb[0] , hsb[1] , hsb[2] ) ;
		break;
	default:
		hsb = diy.settings.getTint( $Template+'-tint' ) ;
		Template_tinter.setFactors( hsb[0] , hsb[1] , hsb[2] ) ;
	}
	
	sheet.paintImage( g , Template_tinter.getTintedImage() , Card+'-template' ) ;
	
	switch( String($Template) ){
	case 'CustomDifficulty':
		hsb = diy.settings.getTint( 'Template-tint' ) ;
		EncounterDeco_tinter.setFactors( hsb[0] , hsb[1] , hsb[2] ) ;
		sheet.paintImage( g , EncounterDeco_tinter.getTintedImage() , Card+'-template' ) ;
		break;
	case 'Standard':
	case 'Nightmare':
	case 'Saga':
		hsb = diy.settings.getTint( $Template+'-tint' ) ;
		EncounterDeco_tinter.setFactors( hsb[0] , hsb[1] , hsb[2] ) ;
		sheet.paintImage( g , EncounterDeco_tinter.getTintedImage() , Card+'-template' ) ;
		break;
	default:
		if( sheet.getSheetIndex() == BACK ){
			let templateImage = diy.settings.getImageResource( Card+'-template' ) ;
			templateImage = ImageUtils.mirror( templateImage ) ;
			sheet.paintImage( g , templateImage , Card+'-template' ) ;
		}else{ sheet.paintTemplateImage( g ) ; }
	}
	
// ADAPTER
	var adapterImage = null ;
	
	var decoType ;
	switch( String($Template) ){
	case 'Standard': 
	case 'Nightmare': 
	case 'Saga': 
	case 'CustomDifficulty':
		decoType = 'Encounter';
		break;
	default:
		decoType = 'Player';
	}

	EncounterSetIcon = getIcon( 'EncounterSet' ) ;
	switch( String($IconLayout) ){
	case 'Left':
		adapterImage = ImageUtils.get( CardPath+decoType+'-adapter-Left.jp2' ) ;
		if( sheet.getSheetIndex() == BACK ) adapterImage = ImageUtils.mirror( adapterImage ) ;
		sheet.paintImage( g , adapterImage , Card+'-adapter' ) ;
		
		if( sheet.getSheetIndex() === FRONT ) sheet.paintImage( g , EncounterSetIcon , Card+'-icon-Left' ) ;
		else sheet.paintImage( g , EncounterSetIcon , Card+'-icon-Right' ) ;
		break;
	case 'LeftMiddle':
		adapterImage = ImageUtils.get( CardPath+decoType+'-adapter-LeftMiddle.jp2' ) ;
		if( sheet.getSheetIndex() == BACK ) adapterImage = ImageUtils.mirror( adapterImage ) ;
		sheet.paintImage( g , adapterImage , Card+'-adapter' ) ;
		
		if( sheet.getSheetIndex() === FRONT ) sheet.paintImage( g , EncounterSetIcon , Card+'-icon-LeftMiddle' ) ;
		else sheet.paintImage( g , EncounterSetIcon , Card+'-icon-RightMiddle' ) ;
		break;
	case 'RightMiddle':
		adapterImage = ImageUtils.get( CardPath+decoType+'-adapter-LeftMiddle.jp2' ) ;
		if( sheet.getSheetIndex() == FRONT ) adapterImage = ImageUtils.mirror( adapterImage ) ;
		sheet.paintImage( g , adapterImage , Card+'-adapter' ) ;

		if( sheet.getSheetIndex() === FRONT ) sheet.paintImage( g , EncounterSetIcon , Card+'-icon-RightMiddle' ) ;
		else sheet.paintImage( g , EncounterSetIcon , Card+'-icon-LeftMiddle' ) ;
		break;
	case 'Right':
		adapterImage = ImageUtils.get( CardPath+decoType+'-adapter-Left.jp2' ) ;
		if( sheet.getSheetIndex() == FRONT ) adapterImage = ImageUtils.mirror( adapterImage ) ;
		sheet.paintImage( g , adapterImage , Card+'-adapter' ) ;
		
		if( sheet.getSheetIndex() === FRONT ) sheet.paintImage( g , EncounterSetIcon , Card+'-icon-Right' ) ;
		else sheet.paintImage( g , EncounterSetIcon , Card+'-icon-Left' ) ;
		break;
	default:
		adapterImage = ImageUtils.get( CardPath+decoType+'-adapter-Title.jp2' ) ;
		if( sheet.getSheetIndex() == BACK ) adapterImage = ImageUtils.mirror( adapterImage ) ;
		sheet.paintImage( g , adapterImage , Card+'-adapter' ) ;
		CollectionIcon = getIcon( 'Collection' ) ;
		if( sheet.getSheetIndex() === FRONT ){
			sheet.paintImage( g , EncounterSetIcon , Card+'-icon-TitleLeft' ) ;
			sheet.paintImage( g , CollectionIcon , Card+'-icon-TitleRight' ) ; 
		}else{
			if( Card == 'DividerHorizontal' ){
				regionLeft = diy.settings.getRegion( Card+'-icon-TitleLeft-back' ) ;
				regionRight = diy.settings.getRegion( Card+'-icon-TitleRight-back' ) ;
			}else{
				regionLeft = diy.settings.getRegion( Card+'-icon-TitleLeft' ) ;
				regionRight = diy.settings.getRegion( Card+'-icon-TitleRight' ) ;
			}
			if( diy.settings.getBoolean( 'IconSwap' , false ) === true ){
				sheet.paintImage( g , EncounterSetIcon , regionRight ) ;
				sheet.paintImage( g , CollectionIcon , regionLeft ) ;
			}else{
				sheet.paintImage( g , EncounterSetIcon , regionLeft ) ;
				sheet.paintImage( g , CollectionIcon , regionRight ) ;
			}
		}
		if( (Card == 'DividerHorizontal') && (sheet.getSheetIndex() == BACK) ){
			Name_writer.markupText = $Name ;
			Name_writer.drawAsSingleLine( g , diy.settings.getRegion( 'DividerHorizontal-Name-back' ) ) ;
		}else{
			writeLine( 'Name' , Name_writer , g , diy ) ;
		}
	}
	
// ICONS
	writeTextOutlined( 'Artist' , Artist_writer , selectStroke( 'Bottom-stroke' , diy ) , diy , g , sheet ) ;
	paintIcon( 'Collection' , g , sheet ) ;
	paintIcon( 'EncounterSet' , g , sheet ) ;

}

function updateExternalPortrait( key , diy ){
// this funtion provides support for updating through external scripting
// user definable elements that don't relly just on settings, like the
// portraits. Some other stuff, like the Artist, have special 
	var value = diy.settings.get( key+'-external-path' ) ;
	if(	( value != '' ) && ( value != null ) ){
		index = portraitIndexOf( key ) ;
		PortraitList[ index ].setImage(
			value ,
			diy.settings.getImageResource(
				key+'-external-path'
			)
		) ;
		diy.settings.set( key+'-external-path' , '' ) ;
		
		value = diy.settings.get( key+'-external-panx' ) ;
		if(	( value != '' ) && ( value != null ) ){
			PortraitList[ index ].setPanX( value ) ;
			diy.settings.set( key+'-external-panx' , '' ) ;
		}
		
		value = diy.settings.get( key+'-external-pany' ) ;
		if(	( value != '' ) && ( value != null ) ){
			PortraitList[ index ].setPanY( value ) ;
			diy.settings.set( key+'-external-pany' , '' ) ;
		}
		
		value = diy.settings.get( key+'-external-scale' ) ;
		if(	( value != '' ) && ( value != null ) ){
			PortraitList[ index ].setScale( value ) ;
			diy.settings.set( key+'-external-scale' , '' ) ;
		}
	}
}

/* main functions */
function onRead( diy , ois ){
/*
This is one of the main functions on scripted components.
This function is called on component file loading.
When using custom portrait handling, Portraits must be loaded
explicitly.
*/
	debug( 1 , 'onRead: ' ) ;
	if( diy.settings.get( 'VersionHistory' , '' ) == '' ){
		debug( 1 , 'onRead: VersionHistory nonexistent' ) ;
		$VersionHistory = diy.version ;
	}
	var LastVersion = String($VersionHistory).split(',') ;
	LastVersion = LastVersion[ LastVersion.length - 1 ] ;
	if( LastVersion != Number(LibraryVersion+CardVersion) ){
		debug( 1 , 'onRead: VersionHistory updated' ) ;
		$VersionHistory = $VersionHistory+','+LibraryVersion+CardVersion ;
	}
	
	try{ portrait = ois.readObject() ; }catch(err){ portrait = null ; }
	while( portrait != null ){ 
		var index = PortraitList.length ;
		PortraitList[ index ] = portrait ;
		try{ portrait = ois.readObject() ; }catch(err){ portrait = null ; }
	}
}

function onWrite( diy , oos ){
/*
This is one of the main functions on scripted components.
This function is called on component file save.
When using custom portrait handling, Portraits must be saved
explicitly.
*/
	debug( 1 , 'onWrite: ' ) ;
	for( var index in PortraitList ){ oos.writeObject( PortraitList[ index ] ) ; }
}

function onClear( diy ){
/*
This is one of the main functions on scripted components.
This function is called by the user interface on
Edit>Clear menu. Should be used only to initialize the component
settings and controls.
In my code, I use the Localizable list defined in the game object
to clear all the text of the card.
*/
	debug( 1 , 'onClear: ' ) ;
	for( var index in GO.LocalizableList ){
		diy.settings.reset( GO.LocalizableList[ index ] ) ;
	}
}
