useLibrary( 'extension' ) ;

const componentList = new Array(
	'Ally'
	, 'Attachment'
	, 'Contract'
	, 'Event'
	, 'Hero'
//	, 'HeroPromo'
	, 'SideQuestPlayer'
	, 'Treasure'
) ;

function getName(){ return @LRL-P ; }
function getDescription(){ return @LRL-P-description ; }
function getVersion(){ return 2.0 ; }

function initialize(){
	if( Game.get('LRL') == null ){
		Eons.log.warning( "TheLordOfTheRingsLCG-P can't find TheLordOfTheRingsLCG" ) ;
	}else{
		for(
			let index = 0 ; 
			index < componentList.length ; 
			index++
		){
			ClassMap.add( 'TheLordOfTheRingsLCG/'+componentList[index]+'/component.classmap' );
		}
	}
}
