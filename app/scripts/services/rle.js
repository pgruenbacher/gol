'use strict';

/**
 * @ngdoc service
 * @name golApp.RLE
 * @description
 * # RLE
 * Service in the golApp.
 */
angular.module('golApp')
  .service('RLE', function RLE($http) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    return{
    	getPattern:function(id,callback){
    		var _this=this;
    		$http.get('patterns/'+id+'.rle').then(function(result){
    			var rle = result.data;
				var width=parseInt(rle.substr(rle.indexOf('x = ')+4,3));
				var height=parseInt(rle.substr(rle.indexOf('y = ')+4,3));
				rle = rle.substr(rle.indexOf('\n', rle.indexOf('rule')+1)).replace('\n', '');
				var pattern = rle.replace('\r', '');
				var object=_this.decompress(pattern);
				var intArray=_this.compress(object,width,height);
				callback(intArray,width,height);
    		},function(result){
    			console.log('error, file doesn\'t exist',result);
    		});
    	},
    	compress:function(object,width,height){
    		var rgba= new Uint8Array(width*height*4);
    		for(var key1 in object){
    			for(var key2 in object[key1]){
    				var index=(parseInt(key1)*width+(parseInt(key2)-1))*4;
    				rgba[index+0]=rgba[index+1]=rgba[index+2]=255;
    			}
    		}
    		//set opacity for all pixels to 255
    		for(var i=3; i<width*height*4; i=i+4){
    			rgba[i]=255;
    		}
    		return rgba;
    	},
    	decompress:function(rle){
    		var piece = {0:{}};
    		var num = '';
    		var x = 0;
    		var y = 0;
			for(var s in rle) {
				s = rle[s];
				if(s === 'b') {
					x = num === '' ? x+1 : x + parseInt(num);
					num = '';
				}
				else if(s === 'o') {
					var i = num === '' ? 1 : parseInt(num);
					while(i--){
						piece[y][x+i] = 1;
						x = num === '' ? x+1 : x + parseInt(num);
						num = '';
					}
				}
				else if(s === '$') {
					y += num === '' ? 1 : parseInt(num);
					x = 0;
					num = '';
					piece[y] = {};
				}
				else if(s === '!'){
					break;
				}
				else if(parseInt(s).toString() !== 'NaN'){
					num += s;
				}
			}
		 	return piece;
		},
		getList:function(){
			return [	
		    	'101',
		    	'104p177',
		    	'104p177_synth',
		    	'104p177reactions',
		    	'104p25',
		    	'105p25',
		    	'10cellinfinitegrowth',
		    	'10enginecordership',
		    	'112p51',
		    	'112p51_synth',
		    	'112p51extended',
		    	'114p6h1v0',
		    	'114p6h1v0pushalong',
		    	'117p18',
		    	'117p9h3v0',
		    	'119p4h1v0',
		    	'123',
		    	'1234',
		    	'1234_synth',
		    	'123p271',
		    	'124p21',
		    	'124p37',
		    	'126p3h1v0',
		    	'128p13.1',
		    	'132p37',
		    	'134p25',
		    	'134p39.1',
		    	'13enginecordership',
		    	'144p24',
		    	'145p20',
		    	'151p3h1v0',
		    	'160p10h2v0',
		    	'168p22.1',
		    	'17c45reaction',
		    	'17columnheavyweightvolcano',
		    	'186p24',
		    	'18p2.471',
		    	'1beacon',
		    	'1beacon_synth',
		    	'20p2',
		    	'21p2',
		    	'21p2_synth',
		    	'22p2',
		    	'22p36',
		    	'22p36_synth',
		    	'23334m',
		    	'233p3h1v0',
		    	'23p2',
		    	'23p2_synth',
		    	'24p10',
		    	'24p2',
		    	'258p3',
		    	'258p3onachimsp11',
		    	'25p3h1v0.1',
		    	'25p3h1v0.2',
		    	'26cellquadraticgrowth',
		    	'26p2',
		    	'26p40',
		    	'274p6h1v0',
		    	'28p7.2',
		    	'28p7.2_synth',
		    	'28p71',
		    	'295p5h1v1',
		    	'29p9',
		    	'2c5ladders',
		    	'2fumaroles',
		    	'2x12infinitegrowth',
		    	'2x210cellstilllifes',
		    	'2x22cellstilllifes',
		    	'2x23cellstilllifes',
		    	'2x24cellstilllifes',
		    	'2x25cellstilllifes',
		    	'2x26cellstilllifes',
		    	'2x27cellstilllifes',
		    	'2x28cellstilllifes',
		    	'2x29cellstilllifes',
		    	'2x2blockoscillators',
		    	'2x2glider',
		    	'2x2linepuffer',
		    	'2x2oscillators',
		    	'2x2period2oscillators',
		    	'2x2stills',
		    	'30p5h2v0',
		    	'34p13',
		    	'35p52',
		    	'35p52_synth',
		    	'36p22',
		    	'36p22_synth',
		    	'37p10.1',
		    	'37p10.2',
		    	'37p7.1',
		    	'38p111',
		    	'38p7.2',
		    	'38p7.3',
		    	'3enginecordership',
		    	'3enginecordership_synth',
		    	'3enginecordershipeater',
		    	'3enginecordershipgun',
		    	'3enginecordershiplwssreflection',
		    	'3enginecordershiprake',
		    	'400p49',
		    	'41p7.2',
		    	'42p101',
		    	'43p18',
		    	'43p18_synth',
		    	'440p49.1',
		    	'44p5h2v0',
		    	'44p7.2',
		    	'45hivenudgers',
		    	'46p22',
		    	'46p4h1v0',
		    	'47p72',
		    	'47p72_synth',
		    	'4812diamond',
		    	'48p22',
		    	'48p31',
		    	'49p88',
		    	'49p88_synth',
		    	'4boats',
		    	'4boats_synth',
		    	'4c13ladders',
		    	'4c9ladders',
		    	'4enginecordership',
		    	'4enginecordershipb',
		    	'50p35',
		    	'54p171',
		    	'56p27',
		    	'56p6h1v0',
		    	'58p5h1v1',
		    	'5enginecordership',
		    	'5x5infinitegrowth',
		    	'60p13.1',
		    	'60p3h1v0.3',
		    	'60p3h1v0.3reactions',
		    	'60p5h2v0',
		    	'60p5h2v0_synth',
		    	'60p5h2v0eater',
		    	'64p13.1',
		    	'64p13.2',
		    	'64p2h1v0',
		    	'65p131',
		    	'67p5h1v1',
		    	'69p48',
		    	'6enginecordership',
		    	'6enginecordership_synth',
		    	'6enginecordershipgun',
		    	'6enginecordershipv2',
		    	'70p5h2v0',
		    	'71p171',
		    	'7468m',
		    	'77p6h1v1',
		    	'78p70',
		    	'7enginecordership',
		    	'7enginecordershipreflections',
		    	'7inarowcordership',
		    	'7inarowcordership_synth',
		    	'7inarowcordershipeater',
		    	'86p5h1v1',
		    	'86p9h3v0',
		    	'88p28',
		    	'92p331',
		    	'94p271',
		    	'98p25',
		    	'98p25_synth',
		    	'achimsp11',
		    	'achimsp144',
		    	'achimsp144_synth',
		    	'achimsp16',
		    	'achimsp16_synth',
		    	'achimsp4',
		    	'achimsp4_synth',
		    	'achimsp8',
		    	'acorn',
		    	'acorn_synth',
		    	'aforall',
		    	'aforall_synth',
		    	'aircraftcarrier',
		    	'aircraftcarrier_synth',
		    	'airforce',
		    	'ak47reaction',
		    	'almostknightship',
		    	'almosymmetric',
		    	'alternateeater5',
		    	'alternatepentadecathlononsnacker',
		    	'alternatepiorbital',
		    	'alternatewickstretcher1',
		    	'ants',
		    	'anvil',
		    	'apps',
		    	'average',
		    	'b29',
		    	'b29withgliders',
		    	'b3578s238replicator',
		    	'b52bomber',
		    	'babblingbrook1',
		    	'backrake1',
		    	'backrake2',
		    	'backrake3',
		    	'backwardspacerake',
		    	'baker',
		    	'bakersdozen',
		    	'bakersdozen_synth',
		    	'bakery',
		    	'bakery_synth',
		    	'barge',
		    	'barge2extended',
		    	'barge2spaceship',
		    	'barge_synth',
		    	'bargeextended',
		    	'bargespaceship',
		    	'beacon',
		    	'beacon_synth',
		    	'beaconandlonghook_synth',
		    	'beaconandtwotails',
		    	'beaconandtwotails_synth',
		    	'beaconmaker',
		    	'beaconon38p11.1',
		    	'beehat',
		    	'beehat_synth',
		    	'beehive',
		    	'beehive_synth',
		    	'beehiveandcap',
		    	'beehiveanddock',
		    	'beehiveandlonghookeatingtub',
		    	'beehiveandlonghookeatingtub_synth',
		    	'beehiveandtable',
		    	'beehiveandtable_synth',
		    	'beehiveatbeehive',
		    	'beehiveatbeehive_synth',
		    	'beehiveatloaf',
		    	'beehiveatloaf_synth',
		    	'beehivebendtail',
		    	'beehivebendtail_synth',
		    	'beehivefuse',
		    	'beehivewithnine',
		    	'beehivewithnine_synth',
		    	'beehivewithtail',
		    	'beehivewithtail_synth',
		    	'bentkeys',
		    	'bentkeys_synth',
		    	'bheptomino',
		    	'bheptomino_synth',
		    	'biblock',
		    	'biblock_synth',
		    	'bicap',
		    	'bicap_synth',
		    	'biclock',
		    	'bigglider',
		    	'bigs',
		    	'bigs_synth',
		    	'bigun',
		    	'bigun_synth',
		    	'biloaf1',
		    	'biloaf1_synth',
		    	'biloaf2',
		    	'biloaf2_synth',
		    	'biloaf3',
		    	'bipole',
		    	'bipole_synth',
		    	'bipolebridgepseudobarberpole',
		    	'bipolebridgepseudobarberpole_synth',
		    	'bipond',
		    	'bipond_synth',
		    	'bistableswitch',
		    	'bitingoffmorethantheycanchew',
		    	'bitingoffmorethantheycanchew_synth',
		    	'bitingoffmorethantheycanchewextended',
		    	'blinker',
		    	'blinker_synth',
		    	'blinkerfuse',
		    	'blinkerfuse2',
		    	'blinkerfuse3',
		    	'blinkerfuse6c13',
		    	'blinkerfuse_synth',
		    	'blinkerpuffer1',
		    	'blinkerpuffer1_synth',
		    	'blinkerpuffer2',
		    	'blinkersbitpole',
		    	'blinkership1',
		    	'block',
		    	'block_synth',
		    	'blockade',
		    	'blockade_synth',
		    	'blockandcap',
		    	'blockandcap_synth',
		    	'blockanddock',
		    	'blockanddock_synth',
		    	'blockandglider',
		    	'blockandtwotails',
		    	'blockandtwotails_synth',
		    	'blockedp41',
		    	'blockedp42',
		    	'blockedp43',
		    	'blockedp4tnose',
		    	'blocker',
		    	'blocker_synth',
		    	'blocklayingswitchengine',
		    	'blocklayingswitchengine_synth',
		    	'blocklayingswitchenginepredecessor',
		    	'blockonboat',
		    	'blockonboat_synth',
		    	'blockontable',
		    	'blockontable_synth',
		    	'blockstacker',
		    	'blom',
		    	'boat',
		    	'boat_synth',
		    	'boatbit',
		    	'boatmaker',
		    	'boatonquadpole',
		    	'boatonquadpole_synth',
		    	'boatonsparkcoil',
		    	'boatonsparkcoil_synth',
		    	'boatshiptie',
		    	'boatshiptie_synth',
		    	'boatstretcher1',
		    	'boattie',
		    	'boattie_synth',
		    	'boatwithlongtail',
		    	'boatwithlongtail_synth',
		    	'bomberpredecessor',
		    	'boojumreflector',
		    	'bookend',
		    	'bookend_synth',
		    	'bookends',
		    	'bookends_synth',
		    	'boss',
		    	'bottle',
		    	'brain',
		    	'breeder1',
		    	'bricklayer',
		    	'buckaroo',
		    	'buckaroo_synth',
		    	'bulletheptomino',
		    	'bun',
		    	'bunnies',
		    	'bunnies10',
		    	'bunnies11',
		    	'bunnies9',
		    	'bunnies_synth',
		    	'burloaferimeter',
		    	'burloaferimeter_synth',
		    	'butterfly',
		    	'butterfly_synth',
		    	'byflops',
		    	'byflops_synth',
		    	'c2wickstretcher',
		    	'c3ladder',
		    	'c3ladders',
		    	'c4diagonalpuffer1',
		    	'c4diagonalspaceships',
		    	'c4orthogonalspaceships',
		    	'c5diagonalpuffer1',
		    	'c5diagonaltubstretcher',
		    	'c5greyship',
		    	'cabertosser1',
		    	'canadagoose',
		    	'candelabra',
		    	'candlefrobra',
		    	'candlefrobra_synth',
		    	'canoe',
		    	'canoe_synth',
		    	'cap',
		    	'carnivalshuttle',
		    	'carriersiamesecarrier',
		    	'carriersiamesecarrier_synth',
		    	'carriersiamesesnake',
		    	'carriersiamesesnake_synth',
		    	'catacryst',
		    	'caterer',
		    	'caterer_synth',
		    	'catereron34p13',
		    	'catereron36p22',
		    	'catereron44p7.2',
		    	'catereronfigureeight',
		    	'cauldron',
		    	'cauldron_synth',
		    	'centinal',
		    	'centinal_synth',
		    	'centinalreflector',
		    	'century',
		    	'centuryeater',
		    	'champageglass',
		    	'champagneglass',
		    	'chemist',
		    	'cheptomino',
		    	'cheshirecat',
		    	'chickenwire',
		    	'cisbargewithtail',
		    	'cisbargewithtail_synth',
		    	'cisbeaconandanvil',
		    	'cisbeaconandcap',
		    	'cisbeaconandcap_synth',
		    	'cisbeaconanddock',
		    	'cisbeaconanddock_synth',
		    	'cisbeaconandtable',
		    	'cisbeaconandtable_synth',
		    	'cisbeaconupandlonghook',
		    	'cisbeaconupandlonghook_synth',
		    	'cisblockandlonghook',
		    	'cisblockandlonghook_synth',
		    	'cisboatanddock',
		    	'cisboatanddock_synth',
		    	'cisboatandlonghookeatingtub',
		    	'cisboatandlonghookeatingtub_synth',
		    	'cisboatandtable',
		    	'cisboatandtable_synth',
		    	'cisboatwithtail',
		    	'cisboatwithtail_synth',
		    	'cisfusewithtwotails',
		    	'cisfusewithtwotails_synth',
		    	'cishookandrbee',
		    	'cishookwithtail',
		    	'cishookwithtail_synth',
		    	'cisloafwithtail',
		    	'cisloafwithtail_synth',
		    	'cismirroredrbee',
		    	'cismirroredrbee_synth',
		    	'cisrbeeandrloaf',
		    	'cisrotatedrbee',
		    	'cisshillelagh',
		    	'cisshillelagh_synth',
		    	'clawwithtail',
		    	'clawwithtail_synth',
		    	'clock',
		    	'clock2',
		    	'clock_synth',
		    	'coeship',
		    	'coeship_synth',
		    	'coesp8',
		    	'coesp8_synth',
		    	'conduit1',
		    	'confusedeaters',
		    	'confusedeaters_synth',
		    	'cordpuller',
		    	'cousinprimecalculator',
		    	'cousins',
		    	'cover',
		    	'cow',
		    	'crab',
		    	'crabtubstretcher',
		    	'cross',
		    	'cross2',
		    	'cross_synth',
		    	'crowd',
		    	'crown',
		    	'crown_synth',
		    	'cuphook',
		    	'cuphook_synth',
		    	'dart',
		    	'deadsparkcoil',
		    	'deadsparkcoil_synth',
		    	'deepcell',
		    	'diamondring',
		    	'diamondring_synth',
		    	'diehard',
		    	'dinnertable',
		    	'dinnertableextension',
		    	'diuresis',
		    	'dock',
		    	'doseedo',
		    	'doublecaterer',
		    	'doubleewe',
		    	'doublex',
		    	'dragon',
		    	'dragonflotillae',
		    	'eater1',
		    	'eater1_synth',
		    	'eater1reactions',
		    	'eater1withblinker',
		    	'eater1withglider',
		    	'eater1withloaf',
		    	'eater1withprebeehive',
		    	'eater2',
		    	'eater2_synth',
		    	'eater3',
		    	'eater4',
		    	'eater5',
		    	'eater5eatinggliders',
		    	'eaterblockfrob',
		    	'eaterblockfrob_synth',
		    	'eateronboat',
		    	'eateronboat_synth',
		    	'eaterplug',
		    	'eaterplug_synth',
		    	'eatersiameseeater',
		    	'eatersiameseeater_synth',
		    	'eaterstampcollection',
		    	'ecologist',
		    	'edgerepairherschel',
		    	'edgerepairspaceship1',
		    	'edgerepairspaceship2',
		    	'edna',
		    	'edna26',
		    	'electricfence',
		    	'elevener',
		    	'elevener_synth',
		    	'elevenloop',
		    	'elevenloop_synth',
		    	'elkiesp5',
		    	'elkiesp5_synth',
		    	'ellisonp4hwemulator',
		    	'ellisonp4hwemulatorhybrid',
		    	'empty',
		    	'enretard',
		    	'enterprise',
		    	'eureka',
		    	'eureka_synth',
		    	'eurekav2',
		    	'extraextralongsnake',
		    	'extraextralongsnake_synth',
		    	'extralongsnake',
		    	'extralongsnake_synth',
		    	'extremelyimpressive',
		    	'extremelyimpressive_synth',
		    	'fastforwardforcefield',
		    	'fermatprimecalculator',
		    	'figureeight',
		    	'figureeight_synth',
		    	'figureeightasreflector',
		    	'figureeighton36p22',
		    	'figureeightonpentadecathlon',
		    	'fleet',
		    	'fleet_synth',
		    	'fly',
		    	'flyextension',
		    	'flyon60p3h1v0.3',
		    	'foreandback',
		    	'fountain',
		    	'fourteener',
		    	'fourteener_synth',
		    	'fox',
		    	'fox_synth',
		    	'frenchkiss',
		    	'frogii',
		    	'fumarole',
		    	'fumarole_synth',
		    	'fumaroleon34p13',
		    	'fumaroleonachimsp11',
		    	'gabrielsp138',
		    	'gabrielsp138_synth',
		    	'gardenofeden1',
		    	'gardenofeden2',
		    	'gardenofeden3',
		    	'gardenofeden4',
		    	'gardenofeden5',
		    	'gardensofeden',
		    	'germ',
		    	'glasses',
		    	'glasses_synth',
		    	'glider',
		    	'glider_synth',
		    	'gliderduplicator1',
		    	'gliderloop',
		    	'gliderproducingswitchengine',
		    	'gliderproducingswitchengine_synth',
		    	'gliderproducingswitchenginepredecessor',
		    	'glidersbythedozen',
		    	'glidersbythedozen_synth',
		    	'glidersymmetricpps',
		    	'glidesymmetricpps',
		    	'gosperglidergun',
		    	'gosperglidergun_synth',
		    	'gosperglidergungliderdestruction',
		    	'gottsdots',
		    	'gourmet',
		    	'graycounter',
		    	'graycounter_synth',
		    	'greatonoff',
		    	'greatonoff_synth',
		    	'griddleandbeehive',
		    	'griddleandbeehive_synth',
		    	'griddleandblock',
		    	'griddleandblock_synth',
		    	'griddleandboat',
		    	'griddleandboat_synth',
		    	'grin',
		    	'gunstar',
		    	'gunstar2',
		    	'gunstar216',
		    	'hacksaw',
		    	'halfmax',
		    	'halfmaxv2',
		    	'halfmaxv3',
		    	'hammerhead',
		    	'harbor',
		    	'harbor_synth',
		    	'harvester',
		    	'hat',
		    	'hat_synth',
		    	'heart',
		    	'heavyweightemulator',
		    	'heavyweightemulator_synth',
		    	'heavyweightvolcano',
		    	'hebdarole',
		    	'hectic',
		    	'heptapole',
		    	'heptapole_synth',
		    	'herschel',
		    	'herschelgrandparent',
		    	'herschelparent',
		    	'herschelreceiver',
		    	'herscheltransmitterstable',
		    	'hertzoscillator',
		    	'hertzoscillator_synth',
		    	'hexapole',
		    	'hexapole_synth',
		    	'highlife10cellstilllifes',
		    	'highlife11cellstilllifes',
		    	'highlife12cellstilllifes',
		    	'highlife13cellstilllifes',
		    	'highlife4cellstilllifes',
		    	'highlife5cellstilllifes',
		    	'highlife6cellstilllifes',
		    	'highlife7cellstilllifes',
		    	'highlife8cellstilllifes',
		    	'highlife9cellstilllifes',
		    	'hivemaker',
		    	'hivenudger',
		    	'hivenudger2',
		    	'hivenudger_synth',
		    	'honeybit',
		    	'honeycomb',
		    	'honeycomb_synth',
		    	'honeyfarm',
		    	'honeyfarm_synth',
		    	'hooks',
		    	'hookwithtail',
		    	'hookwithtail_synth',
		    	'house',
		    	'house_synth',
		    	'hustler',
		    	'hustler_synth',
		    	'hustlerii',
		    	'hustlerii_synth',
		    	'hwss',
		    	'hwss_synth',
		    	'hwssblinkerfuse',
		    	'infinitegliderhotel',
		    	'infinitegliderhotel2',
		    	'infinitegliderhotel3',
		    	'infinitelwsshotel',
		    	'inlineinverter',
		    	'integralsign',
		    	'integralsign_synth',
		    	'integralwithhook',
		    	'integralwithhook_synth',
		    	'integralwithtub',
		    	'integralwithtub_synth',
		    	'interchange',
		    	'interchange_synth',
		    	'iwona',
		    	'jack',
		    	'jack_synth',
		    	'jam',
		    	'jam_synth',
		    	'jamon34p13.1',
		    	'jamon44p7.2',
		    	'jasonsbow',
		    	'jellyfish',
		    	'jolson',
		    	'jolson_synth',
		    	'jolsonperiod9',
		    	'justyna',
		    	'karelsp15',
		    	'karelsp15_synth',
		    	'killercandlefrobras',
		    	'killertoads',
		    	'koksgalaxy',
		    	'koksgalaxy_synth',
		    	'lake2',
		    	'lake2_synth',
		    	'laputa',
		    	'lidka',
		    	'lifewithoutdeathquadraticgrowth',
		    	'lightbulb',
		    	'lightbulb_synth',
		    	'lightspeedoscillator1',
		    	'lightspeedoscillator2',
		    	'lightspeedoscillator3',
		    	'lightweightemulator',
		    	'linepuffer',
		    	'loadingdock',
		    	'loaf',
		    	'loaf_synth',
		    	'loaflipflop',
		    	'loafsiamesebarge',
		    	'loafsiamesebarge_synth',
		    	'loafsiameseloaf',
		    	'loafsiameseloaf_synth',
		    	'loaftractorbeam',
		    	'logt2growth',
		    	'lol.txt',
		    	'longbarge',
		    	'longbarge_synth',
		    	'longboat',
		    	'longboat_synth',
		    	'longcanadagoose',
		    	'longcanoe',
		    	'longcanoe_synth',
		    	'longhook',
		    	'longhookwithtail',
		    	'longhookwithtail_synth',
		    	'longintegral',
		    	'longintegral_synth',
		    	'longlongbarge',
		    	'longlongbarge_synth',
		    	'longlongboat',
		    	'longlongboat_synth',
		    	'longlongcanoe',
		    	'longlongcanoe_synth',
		    	'longlonghookwithtail',
		    	'longlonghookwithtail_synth',
		    	'longlongshillelagh',
		    	'longlongshillelagh_synth',
		    	'longlongship',
		    	'longlongship_synth',
		    	'longlongsnake',
		    	'longlongsnake_synth',
		    	'longshillelagh',
		    	'longshillelagh_synth',
		    	'longship',
		    	'longship_synth',
		    	'longsnake',
		    	'longsnake_synth',
		    	'loop',
		    	'loop_synth',
		    	'lwss',
		    	'lwss_synth',
		    	'lwsstagalong',
		    	'mango',
		    	'mango_synth',
		    	'mathematician',
		    	'max',
		    	'maze2cellstilllifes',
		    	'maze3cellstilllifes',
		    	'maze4cellstilllifes',
		    	'maze5cellstilllifes',
		    	'maze6cellstilllifes',
		    	'maze7cellstilllifes',
		    	'maze8cellstilllifes',
		    	'maze9cellstilllifes',
		    	'mazeperiod2',
		    	'mazestilllifes',
		    	'mazewickstretcher',
		    	'mazing',
		    	'mazing_synth',
		    	'mersenneprimecalculator',
		    	'metacatacryst',
		    	'mickeymouse',
		    	'middleweightemulator',
		    	'middleweightemulator_synth',
		    	'middleweightvolcano',
		    	'minipressurecooker',
		    	'minipressurecooker_synth',
		    	'mirage',
		    	'mirroreddock',
		    	'mirroreddock_synth',
		    	'mold',
		    	'mold_synth',
		    	'moldandlonghookeatingtub',
		    	'moldandlonghookeatingtub_synth',
		    	'moldon36p22',
		    	'moldon36p22_synth',
		    	'moldon41p7.2',
		    	'moldonfumarole',
		    	'moldonfumarole_synth',
		    	'moldonpentadecathlon',
		    	'moldonpentadecathlon_synth',
		    	'monogram',
		    	'monogram_synth',
		    	'montana',
		    	'mooseantlers',
		    	'mooseantlers_synth',
		    	'mosquito1',
		    	'mosquito1b',
		    	'mosquito2',
		    	'mosquito3',
		    	'mosquito4',
		    	'mosquito5',
		    	'movepuffer',
		    	'movestilllifes',
		    	'movingsawtooth',
		    	'multuminparvo',
		    	'mutteringmoat1',
		    	'mwss',
		    	'mwss_synth',
		    	'negentropy',
		    	'newfive',
		    	'newgun1',
		    	'newgun2',
		    	'newshuttle',
		    	'noahsark',
		    	'noahsark_synth',
		    	'nonmonotonicspaceship1',
		    	'octagon2',
		    	'octagon2_synth',
		    	'octagon2on36p22',
		    	'octagon4_synth',
		    	'oddkeys',
		    	'oddkeys_synth',
		    	'oddtesttubebaby',
		    	'oddtesttubebaby_synth',
		    	'onepergeneration',
		    	'opentomino',
		    	'originaldiuresis',
		    	'originalglidersbythedozen',
		    	'originalp15prepulsarspaceship',
		    	'originalp44piheptominohassler',
		    	'originalp56bheptominoshuttle',
		    	'orion',
		    	'orion2',
		    	'ortholoafandtable',
		    	'ortholoafandtable_synth',
		    	'otcametapixel',
		    	'otcametapixeloff',
		    	'owss',
		    	'p110trafficjam',
		    	'p132hansleohassler',
		    	'p144hansleohassler',
		    	'p156hansleohassler',
		    	'p15prepulsarspaceship',
		    	'p18glidershuttle',
		    	'p230glidershuttle',
		    	'p246glidershuttle',
		    	'p30beehivehassler',
		    	'p31reflection',
		    	'p35beehivehassler',
		    	'p36toadhassler',
		    	'p36toadsucker',
		    	'p37interaction',
		    	'p37reflections',
		    	'p40bheptominoshuttle',
		    	'p41660p5h2v0gun',
		    	'p42glidershuttle',
		    	'p44guns',
		    	'p44piheptominohassler',
		    	'p44piheptominohassler_synth',
		    	'p44trafficlighthassler',
		    	'p44trafficlighthassleroriginal',
		    	'p46gun',
		    	'p48toadhassler',
		    	'p48toadsucker',
		    	'p50glidershuttle',
		    	'p50trafficjam',
		    	'p50trafficjam_synth',
		    	'p54shuttle',
		    	'p54shuttle_synth',
		    	'p56bheptominoshuttle',
		    	'p56bheptominoshuttle_synth',
		    	'p5760unitlifecell',
		    	'p57herschelloop1',
		    	'p58toadsucker',
		    	'p59glidergun8kx8k',
		    	'p59glidergunoriginal',
		    	'p59herschelloop1',
		    	'p5reflector',
		    	'p5reflectorwithgliders',
		    	'p61herschelloop1',
		    	'p69060p5h2v0gun',
		    	'p88piheptominohassler',
		    	'p94s',
		    	'p94s2',
		    	'paperclip',
		    	'paperclip_synth',
		    	'parabolicsawtooth',
		    	'partialqueenbeeloop',
		    	'pedestle',
		    	'pennylane',
		    	'pentadecathlon',
		    	'pentadecathlon_synth',
		    	'pentadecathlonon37p7.1',
		    	'pentadecathlonon38p7.2',
		    	'pentadecathlononsnacker',
		    	'pentadecathlononsnacker_synth',
		    	'pentadecathlononthumb1',
		    	'pentant',
		    	'pentapole',
		    	'pentapole_synth',
		    	'pentoad',
		    	'pentoad1h2',
		    	'pentoad2',
		    	'pentoad_synth',
		    	'pentoadwithtwohexominoes',
		    	'period1114oscillators',
		    	'period2oscillators',
		    	'period3oscillators',
		    	'period4oscillators',
		    	'period59gun',
		    	'period5oscillators',
		    	'period6oscillators',
		    	'period7and8oscillators',
		    	'period8eater3',
		    	'period9and10oscillators',
		    	'phoenix1',
		    	'phoenix1_synth',
		    	'phoenix1extended',
		    	'pieater',
		    	'pieater2',
		    	'piheptomino',
		    	'piheptomino_synth',
		    	'pincers_synth',
		    	'pinwheel',
		    	'piorbital',
		    	'piportraitor',
		    	'pipsquirter1',
		    	'pipsquirter1asreflector',
		    	'pipsquirter2',
		    	'pipsquirter2reflector',
		    	'piship1',
		    	'piston',
		    	'pond',
		    	'pond_synth',
		    	'pondonpond',
		    	'pondonpond_synth',
		    	'popover',
		    	'pp8primecalculator',
		    	'ppentomino',
		    	'prebeehive',
		    	'prebeehive_synth',
		    	'preblock',
		    	'preblock_synth',
		    	'prepulsar',
		    	'prepulsarhassler55',
		    	'prepulsarpredecessor',
		    	'prepulsarshuttle26',
		    	'prepulsarshuttle28',
		    	'prepulsarshuttle29',
		    	'prepulsarshuttle29v2',
		    	'prepulsarshuttle29v3',
		    	'prepulsarshuttle47',
		    	'prepulsarshuttle47v2',
		    	'prepulsarspaceship',
		    	'pressurecooker',
		    	'primequadrupletcalculator',
		    	'primer',
		    	'protein',
		    	'pseudobarberpole',
		    	'pseudobarberpole_synth',
		    	'pseudobarberpoleon36p22',
		    	'puffer1',
		    	'puffer2',
		    	'puffer2_synth',
		    	'pulsar',
		    	'pulsar_synth',
		    	'pulsarquadrant',
		    	'pulsarquadrant_synth',
		    	'pushalong1',
		    	'qpentomino',
		    	'quad',
		    	'quad_synth',
		    	'quadfuse',
		    	'quadpole',
		    	'quadpole_synth',
		    	'quadpseudostilllife',
		    	'quasar',
		    	'queenbee',
		    	'queenbee_synth',
		    	'queenbeeloop',
		    	'queenbeeshuttle',
		    	'queenbeeshuttle_synth',
		    	'queenbeeshuttlepipredecessor',
		    	'queenbeeturner',
		    	'queenbeeturningreaction1',
		    	'r2d2',
		    	'rabbits',
		    	'rabbits_synth',
		    	'radialpseudobarberpole',
		    	'rats',
		    	'rats_synth',
		    	'rbeeandsnake',
		    	'rbeeandsnake_synth',
		    	'rectifier',
		    	'replicator',
		    	'replicatorpredecessor',
		    	'revolver',
		    	'ringoffire',
		    	'rloaf',
		    	'roteightor',
		    	'roteightorextension',
		    	'rpentomino',
		    	'rpentomino_synth',
		    	'rumblingriver1',
		    	'sailboat',
		    	'sawtooth1',
		    	'sawtooth1163',
		    	'sawtooth1846',
		    	'sawtooth260',
		    	'sawtooth262',
		    	'sawtooth269',
		    	'sawtooth362',
		    	'sawtooth562',
		    	'sawtooth633',
		    	'schickengine',
		    	'schickengine_synth',
		    	'scorpion',
		    	'scorpion_synth',
		    	'scotsp5',
		    	'scrubber',
		    	'scrubber_synth',
		    	'scrubber_with_blocks',
		    	'seal',
		    	'sesquihat',
		    	'sesquihat_synth',
		    	'shillelagh',
		    	'shillelagh_synth',
		    	'ship',
		    	'ship_synth',
		    	'shipinabottle',
		    	'shipmaker',
		    	'shiponbipole_synth',
		    	'shiponlongboat',
		    	'shiponlongboat_synth',
		    	'shiponquadpole',
		    	'shiponquadpole_synth',
		    	'shiptie',
		    	'shiptie_synth',
		    	'shortkeys',
		    	'shortkeys_synth',
		    	'sidecar',
		    	'sidecar_synth',
		    	'sidecareater',
		    	'sidecargun',
		    	'sidewalk',
		    	'sidewalk_synth',
		    	'siesta',
		    	'silversp5',
		    	'silversp5_synth',
		    	'sixls',
		    	'sixtynine',
		    	'skewedprepulsar',
		    	'skewedquad',
		    	'skewedquad_synth',
		    	'skewedtrafficlight',
		    	'slidegun',
		    	'slowpuffer1',
		    	'slowpuffer2',
		    	'smallernewshuttle',
		    	'smalllake',
		    	'smalllake_synth',
		    	'smallstilllifes',
		    	'smiley',
		    	'smiley_synth',
		    	'snacker',
		    	'snacker2',
		    	'snacker_synth',
		    	'snackeron38p7.2',
		    	'snail',
		    	'snake',
		    	'snake_synth',
		    	'snakebridgesnake',
		    	'snakebridgesnake_synth',
		    	'snakedance',
		    	'snakepit',
		    	'snakepit2',
		    	'snakepit2_synth',
		    	'snakesiamesesnake',
		    	'snakesiamesesnake_synth',
		    	'snorkelloop',
		    	'snorkelloop_synth',
		    	'sombreros',
		    	'spacefiller1',
		    	'spacefiller2',
		    	'spacerake',
		    	'sparkcoil',
		    	'sparkcoil_synth',
		    	'sparky',
		    	'spentomino',
		    	'spider',
		    	'spiral',
		    	'squaredance',
		    	'stairstephexomino',
		    	'star',
		    	'star_synth',
		    	'stargate',
		    	'stargatewithlightweightspaceships',
		    	'starwithblocks',
		    	'stillater',
		    	'stilllifes',
		    	'stilllifetagalong',
		    	'superfountain',
		    	'surprise',
		    	'swan',
		    	'swanboatstretcher',
		    	'swanweldgoose',
		    	'switchengine',
		    	'symmetricscorpion',
		    	'table',
		    	'tableontable',
		    	'tableontable_synth',
		    	'tail',
		    	'teardrop',
		    	'teardrop_synth',
		    	'technician',
		    	'teeth',
		    	'testtubebaby',
		    	'testtubebaby_synth',
		    	'tetheredrake',
		    	'tetrominoes',
		    	'thumb1',
		    	'thumb2',
		    	'thunderbird',
		    	'thunderbird_synth',
		    	'timebomb',
		    	'titanictoroidaltraveler',
		    	'tlogtgrowth',
		    	'tnosedp4',
		    	'tnosedp6',
		    	'toad',
		    	'toad_synth',
		    	'toadflipper',
		    	'toadsucker',
		    	'toaster',
		    	'totalaperiodic',
		    	'totalperiodic',
		    	'tpentomino',
		    	'trafficcircle',
		    	'trafficjam',
		    	'trafficlight',
		    	'trafficlight_synth',
		    	'transbargewithtail',
		    	'transbargewithtail_synth',
		    	'transbeaconandcap',
		    	'transbeaconandcap_synth',
		    	'transbeaconanddock',
		    	'transbeaconanddock_synth',
		    	'transbeaconandtable',
		    	'transbeaconandtable_synth',
		    	'transblockandlonghook',
		    	'transblockandlonghook_synth',
		    	'transblockandlonghookeatingtub_synth',
		    	'transboatanddock',
		    	'transboatwithnine',
		    	'transboatwithnine_synth',
		    	'transboatwithtail',
		    	'transboatwithtail_synth',
		    	'transfusewithtwotails',
		    	'transfusewithtwotails_synth',
		    	'transhookandrbee',
		    	'transloafwithtail',
		    	'transloafwithtail_synth',
		    	'transmirroredrbee',
		    	'transmirroredrbee_synth',
		    	'transparentblockreaction',
		    	'transqueenbeeshuttle',
		    	'transrbeeandrloaf',
		    	'transrotatedrbee',
		    	'triblock',
		    	'tricetongs',
		    	'tricetongs_synth',
		    	'triplecaterer',
		    	'triplepseudostilllife',
		    	'triplets',
		    	'tripole',
		    	'tripole_synth',
		    	'tritoad',
		    	'period22gun',
		    	'ttetromino',
		    	'tub',
		    	'tub_synth',
		    	'tubber',
		    	'tubtesttubebaby',
		    	'tubtesttubebaby_synth',
		    	'tubwithlonglongtail',
		    	'tubwithlonglongtail_synth',
		    	'tubwithlongtail',
		    	'tubwithlongtail_synth',
		    	'tubwithtail',
		    	'tubwithtail_synth',
		    	'tumbler',
		    	'tumbler_synth',
		    	'tumblingttetson',
		    	'turingmachine',
		    	'turningtoads',
		    	'turtle',
		    	'turtlewithtagalong',
		    	'twinbeesshuttle',
		    	'twinbeesshuttle_synth',
		    	'twinbeesshuttlev2',
		    	'twinhat',
		    	'twinhat_synth',
		    	'twinprimecalculator',
		    	'twirlingttetsons2',
		    	'twoeaters',
		    	'twoeaters_synth',
		    	'twoglidermess',
		    	'twoglidermess_synth',
		    	'twoglidersyntheses',
		    	'twogun',
		    	'twoprelhasslers',
		    	'twopulsarquadrants',
		    	'unicycle',
		    	'unicycle_synth',
		    	'unidimensionalfourgliders',
		    	'unidimensionalinfinitegrowth',
		    	'unidimensionalnothing',
		    	'unidimensionalpentadecathlon',
		    	'unidimensionalsixgliders',
		    	'unidimensionaltumbler',
		    	'unix',
		    	'unix_synth',
		    	'unixon41p7.2',
		    	'upentomino',
		    	'vacuumgun',
		    	'vacuumgunpulling',
		    	'venetianblinds',
		    	'verylonghouse',
		    	'vgun',
		    	'vpentomino',
		    	'washerwoman',
		    	'washingmachine',
		    	'washingmachine_synth',
		    	'wasp',
		    	'wavefront',
		    	'waveguide1',
		    	'weekender',
		    	'weekendertagalong',
		    	'weldedgeese',
		    	'whynot',
		    	'whynot_synth',
		    	'wickstretcher1',
		    	'windmill',
		    	'wing',
		    	'wingextended',
		    	'wingspaceship',
		    	'workerbee',
		    	'workerbee_synth',
		    	'wpentomino',
		    	'x66',
		    	'xpentomino',
		    	'ypentomino',
		    	'zhexomino',
		    	'zpentomino',
		    	'zweiback'    ];
		}
    };
  });