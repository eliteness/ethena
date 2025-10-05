function $(_) {return document.getElementById(_);}
let provider= {};
let signer= {};
ZERO_ADDR = "0x0000000000000000000000000000000000000000";
SAFE_ADDR = "0x0000000000000000000000000000000000001234";
window.addEventListener('load',async function() {
	console.log("waitin for 3 secs..");
	$("cw_m").innerHTML = "Connecting.. Please wait."
	setTimeout(async () => { await basetrip(); }, 3000);
	arf();
}, false);




async function basetrip()
{
	//PRE
	pre_stats();
	//MAIN
	if(!(window.ethereum)){$("cw_m").innerHTML = "Wallet wasn't detected!";console.log("Wallet wasn't detected!");notice("<h3>Wallet wasn't detected!</h3>Please make sure that your device and browser have an active Web3 wallet like MetaMask installed and running.<br><br>Visit <a href='https://metamask.io' target='_blank'>metamask.io</a> to install MetaMask wallet.");provider = new ethers.providers.JsonRpcProvider(RPC_URL); await dexstats();return}
	else if(!Number(window.ethereum.chainId)==CHAINID){$("cw_m").innerHTML = "Wrong network! Please Switch to "+CHAINID;provider = new ethers.providers.JsonRpcProvider(RPC_URL);await dexstats();notice("<h3>Wrong network!</h3>Please Switch to Chain #"+CHAINID+"<btr"+ CHAIN_NAME+ "</u> Blockchain.");}
	else if(//typeOf window.ethereum == Object &&Number(window.ethereum.chainId)
		Number(window.ethereum.chainId)==CHAINID)
	{
		console.log("Recognized Ethereum Chain:", window.ethereum.chainId,CHAINID);
		provider = new ethers.providers.Web3Provider(window.ethereum)
		signer = provider.getSigner();
		if(!(window.ethereum.selectedAddress==null)){console.log("Found old wallet:", window.ethereum.selectedAddress);cw();}
		else{console.log("Didnt find a connected wallet!");cw();}
		//chkAppr(tokes[1][0])
		gubs();
	}
	else //if(Number(window.ethereum.chainId)==CHAINID)
	{
		console.log("Couldn't find Ethereum Provider - ",CHAINID,window.ethereum.chainId)
		if((typeof Number(window.ethereum.chainId) == "number")){$("cw_m").innerHTML = "Wrong network! Switch from " + Number(window.ethereum.chainId)+" to "+CHAINID}
		provider = new ethers.providers.JsonRpcProvider(RPC_URL);
		//signer = provider.getSigner()
		await dexstats();
		$("connect").innerHTML=`Wallet not found.<br><br><button onclick="window.location.reload()" id="btn-connect">Retry?</button>`;
	}
	if(Number(window.ethereum.chainId) != null &&(window.ethereum.chainId!=CHAINID))
	{
		await window.ethereum.request({
    		method: "wallet_addEthereumChain",
    		params: [{
        		chainId: "0x"+(CHAINID).toString(16),
        		rpcUrls: [RPC_URL],
        		chainName: CHAIN_NAME,
        		nativeCurrency: {
            		name: CHAIN_GAS,
            		symbol: CHAIN_GAS,
            		decimals: 18
        		},
        		blockExplorerUrls: [EXPLORE]
    		}]
		});
		window.location.reload()
	}
	//DrefreshFarm()
	//arf()
	cw()
	dexstats()
	gubs()
}



/*
function fornum(n,d)
{
	_n=(Number(n)/10**Number(d));
	n_=_n;
	if(_n>1e18){n_=(_n/1e18).toFixed(2)+" Qt."}
	else if(_n>1e15){n_=(_n/1e15).toFixed(2)+" Qd."}
	else if(_n>1e12){n_=(_n/1e12).toFixed(2)+" Tn."}
	else if(_n>1e9){n_=(_n/1e9).toFixed(2)+" Bn."}
	else if(_n>1e6){n_=(_n/1e6).toFixed(2)+" Mn."}
	else if(_n>1e3){n_=(_n/1e3).toFixed(2)+" Th."}
	else if(_n>0){n_=(_n/1e0).toFixed(5)+""}
	return(n_);
}
*/
function fornum(n,d)
{
	_n=(Number(n)/10**Number(d));
	n_=_n;
	if(_n>1e18){n_=(_n/1e18).toFixed(2)+"Qt"}
	else if(_n>1e15){n_=(_n/1e15).toFixed(2)+"Qd"}
	else if(_n>1e12){n_=(_n/1e12).toFixed(2)+"T"}
	else if(_n>1e9){n_=(_n/1e9).toFixed(2)+"B"}
	else if(_n>1e6){n_=(_n/1e6).toFixed(2)+"M"}
	else if(_n>1e3){n_=(_n/1e3).toFixed(2)+"K"}
	else if(_n>1e1){n_=(_n/1e0).toFixed(2)+""}
	else if(_n>1e0){n_=(_n/1e0).toFixed(5)+""}
	else if(_n>0.0){n_=(_n/1e0).toFixed(8)+""}
	return(n_);
}

const timeFormat = (timestamp) => {const seconds = Math.floor((Date.now() - timestamp) / 1000);const prefix = seconds < 0 ? "For the next " : "Expired ";const absSeconds = Math.abs(seconds);return prefix + (absSeconds < 60 ? absSeconds + " seconds" : absSeconds < 3600 ? Math.floor(absSeconds / 60) + " minutes" : absSeconds < 86400 ? Math.floor(absSeconds / 3600) + " hours" : absSeconds < 2592000 ? Math.floor(absSeconds / 86400) + " days" : absSeconds < 31536000 ? Math.floor(absSeconds / 2592000) + " months" : Math.floor(absSeconds / 31536000) + " years") + (seconds < 0 ? "" : " ago");};

async function cw()
{
	let cs = await cw2(); cs?console.log("Good to Transact"):cw2();
	cw2();
}
async function cw2()
{
	if(!(window.ethereum)){$("cw_m").innerHTML="Metamask not detected! Trying a refresh";console.log("Metamask not found!");window.location.reload();return(0)}
	if(!(Number(window.ethereum.chainId)==CHAINID)){$("cw_m").innerHTML="Wrong network detected! Please switch to chain ID", CHAINID, "and refresh this page.";return(0)}
	if(typeof provider == "undefined"){$("cw_m").innerHTML="Provider not detected! Trying a refresh";console.log("Provider not found!");window.location.reload();return(0)}
	/*
	if(!
		(isFinite(Number(accounts[0])))
		|| (isFinite(Number(window.ethereum.selectedAddress)))
	){console.log("NAAAAAAAAAAAAAAAAA");window.location.reload();}
	*/

	//004
	window.ethereum
	.request({ method: 'eth_requestAccounts' })
	.then(r=>{console.log("004: Success:",r);})	//re-curse to end curse, maybe..
	.catch((error) => {	console.error("004 - Failure", r, error); });


	//005
	const accounts = await window.ethereum.request({ method: 'eth_accounts' });
	if(Number(accounts[0])>0){console.log("005: Success - ", accounts)}
	else{console.log("005: Failure", accounts)}


	/*006
	const en6 = await window.ethereum.enable()
	if(Number(en6[0]) > 0){console.log("006 - Success",en6)}
	else{console.log("006 - Failure", en6)}
	*/


	/*003
	try {
      console.log("attempting cw()")
      const addresses = await provider.request({ method: "eth_requestAccounts" });
      console.log("addresses:",addresses)
    } catch (e) {
      console.log("error in request", e);
      window.location.reload(true);
    }
    */

    //002
    //try{await provider.send("eth_requestAccounts", []);console.log("CWE:",e);}//await window.ethereum.enable();
	//catch(e){console.log("CWE:",e);window.location.reload(true)}
	console.log("doing the paints");
	gubs();
	$("cw").innerHTML= (window.ethereum.selectedAddress).substr(0,10) +"..."+(window.ethereum.selectedAddress).substr(34);
	if(window.ethereum.chainId==250) (new ethers.Contract("0x14ffd1fa75491595c6fd22de8218738525892101",["function getNames(address) public view returns(string[] memory)"],provider)).getNames(window.ethereum.selectedAddress).then(rn=>{if(rn.length>0){$("cw").innerHTML="hi, <span style='/*font-family:bold;font-size:1.337em*/'>"+rn[0]+"</span> 👋"}else{$("cw").innerHTML= (window.ethereum.selectedAddress).substr(0,10) +"..."+(window.ethereum.selectedAddress).substr(34);}})
	$("cw_m").innerHTML=""
	$("connect").style.display="none";
	$("switch").style.display="block";
	//farm_1_f_chappro()
	//arf();
	return(1);
}
function fornum2(n,d) {
	_n=(Number(n)/10**Number(d));
	n_=_n;
	if(_n>1e18){n_=(_n/1e18).toFixed(2)+" Quintillion"}
	else if(_n>1e15){n_=(_n/1e15).toFixed(2)+" Quadrillion"}
	else if(_n>1e12){n_=(_n/1e12).toFixed(2)+" Trillion"}
	else if(_n>1e9){n_=(_n/1e9).toFixed(2)+" Billion"}
	else if(_n>1e6){n_=(_n/1e6).toFixed(2)+" Million"}
	else if(_n>1e3){n_=(_n/1e3).toFixed(2)+" Thousand"}
	else if(_n>1){n_=(_n/1e0).toFixed(8)+""}
	return(n_);
}
function fornum5(n,d,p){
	_n=(Number(n)/10**Number(d));
	n_= _n.toLocaleString(undefined,{maximumFractionDigits:p,minimumFractionDigits:p})
	return(n_);
}

function bigIntToDecimal(x,d) {
	x=BigInt(x).toString();
	return (x.split("").map((e,i)=> (x.length-i==d ? ".":"")+e).join(""))
}

VEABI = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"delegator","type":"address"},{"indexed":true,"internalType":"address","name":"fromDelegate","type":"address"},{"indexed":true,"internalType":"address","name":"toDelegate","type":"address"}],"name":"DelegateChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"delegate","type":"address"},{"indexed":false,"internalType":"uint256","name":"previousBalance","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"newBalance","type":"uint256"}],"name":"DelegateVotesChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"provider","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"},{"indexed":true,"internalType":"uint256","name":"locktime","type":"uint256"},{"indexed":false,"internalType":"enum VotingEscrow.DepositType","name":"deposit_type","type":"uint8"},{"indexed":false,"internalType":"uint256","name":"ts","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint8","name":"version","type":"uint8"}],"name":"Initialized","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"prevSupply","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"supply","type":"uint256"}],"name":"Supply","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"provider","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"ts","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"DELEGATION_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"DOMAIN_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAX_DELEGATES","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"abstain","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_approved","type":"address"},{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"artProxy","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"attach","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"attachments","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"uint256","name":"_block","type":"uint256"}],"name":"balanceOfAtNFT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"balanceOfNFT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"uint256","name":"_t","type":"uint256"}],"name":"balanceOfNFTAt","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"block_number","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"checkpoint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint32","name":"","type":"uint32"}],"name":"checkpoints","outputs":[{"internalType":"uint256","name":"timestamp","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_value","type":"uint256"},{"internalType":"uint256","name":"_lock_duration","type":"uint256"}],"name":"create_lock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_value","type":"uint256"},{"internalType":"uint256","name":"_lock_duration","type":"uint256"},{"internalType":"address","name":"_to","type":"address"}],"name":"create_lock_for","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"delegatee","type":"address"}],"name":"delegate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"delegatee","type":"address"},{"internalType":"uint256","name":"nonce","type":"uint256"},{"internalType":"uint256","name":"expiry","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"delegateBySig","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"delegator","type":"address"}],"name":"delegates","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"uint256","name":"_value","type":"uint256"}],"name":"deposit_for","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"detach","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"epoch","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"getPastTotalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"getPastVotes","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"getPastVotesIndex","outputs":[{"internalType":"uint32","name":"","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"getVotes","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"get_last_user_slope","outputs":[{"internalType":"int128","name":"","type":"int128"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"uint256","name":"_value","type":"uint256"}],"name":"increase_amount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"uint256","name":"_value","type":"uint256"}],"name":"increase_amount_for","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"uint256","name":"_lock_duration","type":"uint256"}],"name":"increase_unlock_time","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token_addr","type":"address"},{"internalType":"address","name":"art_proxy","type":"address"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"},{"internalType":"address","name":"_operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_spender","type":"address"},{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"isApprovedOrOwner","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"locked","outputs":[{"internalType":"int128","name":"amount","type":"int128"},{"internalType":"uint256","name":"end","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"locked__end","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_from","type":"uint256"},{"internalType":"uint256","name":"_to","type":"uint256"}],"name":"merge","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"nonces","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"numCheckpoints","outputs":[{"internalType":"uint32","name":"","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"ownership_change","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"point_history","outputs":[{"internalType":"int128","name":"bias","type":"int128"},{"internalType":"int128","name":"slope","type":"int128"},{"internalType":"uint256","name":"ts","type":"uint256"},{"internalType":"uint256","name":"blk","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_from","type":"address"},{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_from","type":"address"},{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_operator","type":"address"},{"internalType":"bool","name":"_approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_proxy","type":"address"}],"name":"setArtProxy","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_team","type":"address"}],"name":"setTeam","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_voter","type":"address"}],"name":"setVoter","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"slope_changes","outputs":[{"internalType":"int128","name":"","type":"int128"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"supply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes4","name":"_interfaceID","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"team","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"token","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"},{"internalType":"uint256","name":"_tokenIndex","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_block","type":"uint256"}],"name":"totalSupplyAt","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"t","type":"uint256"}],"name":"totalSupplyAtT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_from","type":"address"},{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"user_point_epoch","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"user_point_history","outputs":[{"internalType":"int128","name":"bias","type":"int128"},{"internalType":"int128","name":"slope","type":"int128"},{"internalType":"uint256","name":"ts","type":"uint256"},{"internalType":"uint256","name":"blk","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"uint256","name":"_idx","type":"uint256"}],"name":"user_point_history__ts","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"version","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"voted","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"voter","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"voting","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]

VMABI = [{"inputs":[{"internalType":"address","name":"ve","type":"address"},{"internalType":"address","name":"e","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"","type":"address"},{"indexed":true,"internalType":"uint256","name":"","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"","type":"uint256"}],"name":"Deposit","type":"event"},{"inputs":[],"name":"ELR","outputs":[{"internalType":"contract IELR","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ID","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"converted","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"dao","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"deposit","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"minted","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"bytes","name":"","type":"bytes"}],"name":"onERC721Received","outputs":[{"internalType":"bytes4","name":"","type":"bytes4"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"price","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"quote","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_inc","type":"uint256"}],"name":"rawQuote","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_t","type":"address"},{"internalType":"uint256","name":"_a","type":"uint256"}],"name":"rescue","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"d","type":"address"}],"name":"setDAO","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"setID","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"supplied","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"veRAM","outputs":[{"internalType":"contract IVotingEscrow","name":"","type":"address"}],"stateMutability":"view","type":"function"}]

FARABI = [{"inputs":[{"internalType":"address","name":"_stakingToken","type":"address"},{"internalType":"address","name":"_tg","type":"address"},{"internalType":"bytes","name":"_tf","type":"bytes"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"oldOwner","type":"address"},{"indexed":false,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnerChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnerNominated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bool","name":"isPaused","type":"bool"}],"name":"PauseChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"token","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Recovered","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"token","type":"address"},{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"address","name":"rewardsToken","type":"address"},{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardPaid","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"token","type":"address"},{"indexed":false,"internalType":"uint256","name":"newDuration","type":"uint256"}],"name":"RewardsDurationUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Staked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdrawn","type":"event"},{"constant":true,"inputs":[],"name":"TvlGuru","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"TvlPriceFeed","outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"acceptOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_rewardsToken","type":"address"},{"internalType":"address","name":"_rewardsDistributor","type":"address"},{"internalType":"uint256","name":"_rewardsDuration","type":"uint256"},{"internalType":"bytes","name":"_TvlPriceFeed","type":"bytes"}],"name":"addReward","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"apr","outputs":[{"internalType":"uint256","name":"_apr","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"i","type":"uint256"}],"name":"apr","outputs":[{"internalType":"uint256","name":"_apr","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"aprs","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"address","name":"_rewardsToken","type":"address"}],"name":"earned","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"address","name":"_rewardsToken","type":"address"}],"name":"earnings","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"_user","type":"address"},{"internalType":"address[]","name":"_tokens","type":"address[]"}],"name":"earningsList","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"exit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"feePerMillion","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"feeTaker","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},/* {"constant":false,"inputs":[{"internalType":"address[]","name":"_rewardsTokens","type":"address[]"},{"internalType":"address","name":"_ben","type":"address"}],"name":"getReward","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"getReward","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}	,{"constant":false,"inputs":[{"internalType":"address[]","name":"_rewardsTokens","type":"address[]"}],"name":"getReward","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},	*/ {"constant":false,"inputs":[{"internalType":"address","name":"_rewardsToken","type":"address"}],"name":"getReward","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}	,{"constant":true,"inputs":[{"internalType":"address","name":"_rewardsToken","type":"address"}],"name":"getRewardForDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"lastPauseTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"_rewardsToken","type":"address"}],"name":"lastTimeRewardApplicable","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_owner","type":"address"}],"name":"nominateNewOwner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"nominatedOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_rewardsToken","type":"address"},{"internalType":"uint256","name":"reward","type":"uint256"}],"name":"notifyRewardAmount","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"tokenAddress","type":"address"},{"internalType":"uint256","name":"tokenAmount","type":"uint256"}],"name":"recoverERC20","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"rewardData","outputs":[{"internalType":"address","name":"rewardsDistributor","type":"address"},{"internalType":"uint256","name":"rewardsDuration","type":"uint256"},{"internalType":"uint256","name":"periodFinish","type":"uint256"},{"internalType":"uint256","name":"rewardRate","type":"uint256"},{"internalType":"uint256","name":"lastUpdateTime","type":"uint256"},{"internalType":"uint256","name":"rewardPerTokenStored","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"_rewardsToken","type":"address"}],"name":"rewardPerToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"rewardTokens","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rewardTokensLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rewardTokensList","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"rewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"_f","type":"uint256"}],"name":"setFee","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_f","type":"address"}],"name":"setFeeTaker","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"bool","name":"_paused","type":"bool"}],"name":"setPaused","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_rewardsToken","type":"address"},{"internalType":"address","name":"_rewardsDistributor","type":"address"}],"name":"setRewardsDistributor","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_rewardsToken","type":"address"},{"internalType":"uint256","name":"_rewardsDuration","type":"uint256"}],"name":"setRewardsDuration","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_t","type":"address"},{"internalType":"bytes","name":"_d","type":"bytes"}],"name":"setTvlFeed","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address[]","name":"_t","type":"address[]"},{"internalType":"bytes[]","name":"_d","type":"bytes[]"}],"name":"setTvlFeed","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_tg","type":"address"}],"name":"setTvlGuru","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"stake","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"stakeAll","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"stakingToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"tvl","outputs":[{"internalType":"uint256","name":"_tvl","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"userRewardPerTokenPaid","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"withdrawAll","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]

LPABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"Burn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":true,"internalType":"address","name":"recipient","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"}],"name":"Claim","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"}],"name":"Fees","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"}],"name":"Mint","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0In","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1In","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount0Out","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1Out","type":"uint256"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"Swap","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"reserve0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"reserve1","type":"uint256"}],"name":"Sync","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"blockTimestampLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"burn","outputs":[{"internalType":"uint256","name":"amount0","type":"uint256"},{"internalType":"uint256","name":"amount1","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"claimFees","outputs":[{"internalType":"uint256","name":"claimed0","type":"uint256"},{"internalType":"uint256","name":"claimed1","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"claimStakingFees","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"claimable0","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"claimable1","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"tokenIn","type":"address"},{"internalType":"uint256","name":"amountIn","type":"uint256"}],"name":"current","outputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"currentCumulativePrices","outputs":[{"internalType":"uint256","name":"reserve0Cumulative","type":"uint256"},{"internalType":"uint256","name":"reserve1Cumulative","type":"uint256"},{"internalType":"uint256","name":"blockTimestamp","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"fees","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"address","name":"tokenIn","type":"address"}],"name":"getAmountOut","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getReserves","outputs":[{"internalType":"uint256","name":"_reserve0","type":"uint256"},{"internalType":"uint256","name":"_reserve1","type":"uint256"},{"internalType":"uint256","name":"_blockTimestampLast","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"index0","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"index1","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isStable","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastObservation","outputs":[{"components":[{"internalType":"uint256","name":"timestamp","type":"uint256"},{"internalType":"uint256","name":"reserve0Cumulative","type":"uint256"},{"internalType":"uint256","name":"reserve1Cumulative","type":"uint256"}],"internalType":"struct Pair.Observation","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"metadata","outputs":[{"internalType":"uint256","name":"dec0","type":"uint256"},{"internalType":"uint256","name":"dec1","type":"uint256"},{"internalType":"uint256","name":"r0","type":"uint256"},{"internalType":"uint256","name":"r1","type":"uint256"},{"internalType":"bool","name":"st","type":"bool"},{"internalType":"address","name":"t0","type":"address"},{"internalType":"address","name":"t1","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"mint","outputs":[{"internalType":"uint256","name":"liquidity","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"nonces","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"observationLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"observations","outputs":[{"internalType":"uint256","name":"timestamp","type":"uint256"},{"internalType":"uint256","name":"reserve0Cumulative","type":"uint256"},{"internalType":"uint256","name":"reserve1Cumulative","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"permit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"tokenIn","type":"address"},{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"points","type":"uint256"}],"name":"prices","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"tokenIn","type":"address"},{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"granularity","type":"uint256"}],"name":"quote","outputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"reserve0","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"reserve0CumulativeLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"reserve1","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"reserve1CumulativeLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"tokenIn","type":"address"},{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"points","type":"uint256"},{"internalType":"uint256","name":"window","type":"uint256"}],"name":"sample","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"skim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"stable","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"supplyIndex0","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"supplyIndex1","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount0Out","type":"uint256"},{"internalType":"uint256","name":"amount1Out","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"swap","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"sync","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"token0","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"token1","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tokens","outputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"src","type":"address"},{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}]

MGRABI = [{"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "user","type": "address"},{"indexed": false,"internalType": "uint256","name": "nft","type": "uint256"},{"indexed": false,"internalType": "uint256","name": "veAmount","type": "uint256"},{"indexed": false,"internalType": "uint256","name": "shares","type": "uint256"},{"indexed": false,"internalType": "uint256","name": "wen","type": "uint256"}],"name": "Deposit","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "user","type": "address"},{"indexed": false,"internalType": "uint256","name": "nft","type": "uint256"}],"name": "Reclaim","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "user","type": "address"},{"indexed": false,"internalType": "uint256","name": "nft","type": "uint256"},{"indexed": false,"internalType": "uint256","name": "veAmount","type": "uint256"},{"indexed": false,"internalType": "uint256","name": "shares","type": "uint256"},{"indexed": false,"internalType": "uint256","name": "wen","type": "uint256"}],"name": "Withdraw","type": "event"},{"inputs": [],"name": "ELTOKEN","outputs": [{"internalType": "contract IERC20","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "ID","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "REBASE","outputs": [{"internalType": "contract IRebase","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "REDEMPTIONS","outputs": [{"internalType": "contract IRedemptions","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "VENFT","outputs": [{"internalType": "contract IVotingEscrow","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "VOTER","outputs": [{"internalType": "contract IVoter","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "claimRebase","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "dao","outputs": [{"internalType": "address","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "_id","type": "uint256"}],"name": "deposit","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "feesToBurn","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "feesToDao","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "floor","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "_user","type": "address"},{"internalType": "address","name": "_farm","type": "address"}],"name": "getAllowance","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "_contract","type": "address"}],"name": "getApr","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "getCurrentEpoch","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "getCurrentVote","outputs": [{"internalType": "uint256","name": "_id","type": "uint256"},{"internalType": "uint256","name": "_wen","type": "uint256"},{"internalType": "address[]","name": "_pools","type": "address[]"},{"internalType": "uint256[]","name": "_wt","type": "uint256[]"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "_contract","type": "address"}],"name": "getTvl","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "_user","type": "address"},{"internalType": "address[]","name": "_farms","type": "address[]"},{"internalType": "address[]","name": "_pricing","type": "address[]"}],"name": "info","outputs": [{"internalType": "uint256[]","name": "","type": "uint256[]"},{"internalType": "address[]","name": "","type": "address[]"},{"internalType": "uint256[]","name": "","type": "uint256[]"},{"internalType": "uint256[]","name": "","type": "uint256[]"},{"internalType": "uint256[]","name": "","type": "uint256[]"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "_vo","type": "address"},{"internalType": "address","name": "_el","type": "address"},{"internalType": "uint256","name": "_id","type": "uint256"}],"name": "initialize","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "","type": "address"},{"internalType": "address","name": "","type": "address"},{"internalType": "uint256","name": "","type": "uint256"},{"internalType": "bytes","name": "","type": "bytes"}],"name": "onERC721Received","outputs": [{"internalType": "bytes4","name": "","type": "bytes4"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "paused","outputs": [{"internalType": "bool","name": "","type": "bool"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "","type": "address"},{"internalType": "uint256","name": "","type": "uint256"}],"name": "pendingRedemptions","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "price","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "publicPanic","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "uint256","name": "_id","type": "uint256"}],"name": "quote","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "_inc","type": "uint256"}],"name": "rawQuote","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "reclaim","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "_t","type": "address"},{"internalType": "uint256","name": "_a","type": "uint256"}],"name": "rescue","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "d","type": "address"}],"name": "setDAO","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "uint256","name": "_d","type": "uint256"},{"internalType": "uint256","name": "_b","type": "uint256"}],"name": "setFees","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "uint256","name": "_f","type": "uint256"}],"name": "setFloor","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "uint256","name": "_id","type": "uint256"}],"name": "setID","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "bool","name": "_p","type": "bool"}],"name": "setPaused","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "contract IRebase","name": "_r","type": "address"}],"name": "setRebase","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "contract IRedemptions","name": "_r","type": "address"}],"name": "setRedemptions","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "_m","type": "address"},{"internalType": "bool","name": "_b","type": "bool"}],"name": "setVoteManager","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address[]","name": "_p","type": "address[]"},{"internalType": "uint256[]","name": "_w","type": "uint256[]"}],"name": "vote","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "uint256","name": "_mi","type": "uint256"}],"name": "voteFrom","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "","type": "address"}],"name": "voteManager","outputs": [{"internalType": "bool","name": "","type": "bool"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "voteReset","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "uint256","name": "","type": "uint256"},{"internalType": "uint256","name": "","type": "uint256"}],"name": "votedPools","outputs": [{"internalType": "address","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "votedTime","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "","type": "uint256"},{"internalType": "uint256","name": "","type": "uint256"}],"name": "votedWeights","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "_tamt","type": "uint256"}],"name": "withdraw","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "nonpayable","type": "function"}];

VAULTABI = [{"inputs":[{"internalType":"contract IElitenessFarmland","name":"farm_","type":"address"},{"internalType":"string","name":"name_","type":"string"},{"internalType":"string","name":"symbol_","type":"string"},{"internalType":"contract IPriceGuru","name":"_pg","type":"address"},{"internalType":"address","name":"_rew","type":"address"},{"internalType":"address","name":"_comp","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"allowance","type":"uint256"},{"internalType":"uint256","name":"needed","type":"uint256"}],"name":"ERC20InsufficientAllowance","type":"error"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"uint256","name":"balance","type":"uint256"},{"internalType":"uint256","name":"needed","type":"uint256"}],"name":"ERC20InsufficientBalance","type":"error"},{"inputs":[{"internalType":"address","name":"approver","type":"address"}],"name":"ERC20InvalidApprover","type":"error"},{"inputs":[{"internalType":"address","name":"receiver","type":"address"}],"name":"ERC20InvalidReceiver","type":"error"},{"inputs":[{"internalType":"address","name":"sender","type":"address"}],"name":"ERC20InvalidSender","type":"error"},{"inputs":[{"internalType":"address","name":"spender","type":"address"}],"name":"ERC20InvalidSpender","type":"error"},{"inputs":[{"internalType":"address","name":"receiver","type":"address"},{"internalType":"uint256","name":"assets","type":"uint256"},{"internalType":"uint256","name":"max","type":"uint256"}],"name":"ERC4626ExceededMaxDeposit","type":"error"},{"inputs":[{"internalType":"address","name":"receiver","type":"address"},{"internalType":"uint256","name":"shares","type":"uint256"},{"internalType":"uint256","name":"max","type":"uint256"}],"name":"ERC4626ExceededMaxMint","type":"error"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"shares","type":"uint256"},{"internalType":"uint256","name":"max","type":"uint256"}],"name":"ERC4626ExceededMaxRedeem","type":"error"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"assets","type":"uint256"},{"internalType":"uint256","name":"max","type":"uint256"}],"name":"ERC4626ExceededMaxWithdraw","type":"error"},{"inputs":[{"internalType":"address","name":"token","type":"address"}],"name":"SafeERC20FailedOperation","type":"error"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"oldr","type":"address"},{"indexed":false,"internalType":"address","name":"newr","type":"address"}],"name":"AdminChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"old","type":"address"},{"indexed":false,"internalType":"address","name":"newer","type":"address"}],"name":"CompounderChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":false,"internalType":"uint256","name":"assets","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"shares","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"increment","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"assets","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"shares","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"HardWork","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bool","name":"prev","type":"bool"},{"indexed":false,"internalType":"bool","name":"next","type":"bool"}],"name":"IsHardWorkingChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"token","type":"address"},{"indexed":false,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Recovered","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"sTime","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"sUnderlyingAPR","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"sAssetPriceUSD","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"sAssets","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"sShares","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"sAssetTotalSupply","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"sassetsInFarmlandRatio","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"sVeBackingAssetRatio","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"sAssetPriceInBase","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"sCoinPriceUSD","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"sInteractionID","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"sID","type":"uint256"}],"name":"VaultSnapshot","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":true,"internalType":"address","name":"receiver","type":"address"},{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":false,"internalType":"uint256","name":"assets","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"shares","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"FARMLAND","outputs":[{"internalType":"contract IElitenessFarmland","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PriceGuru","outputs":[{"internalType":"contract IPriceGuru","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"admin","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"apr","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"asset","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"bamt","type":"uint256"}],"name":"burn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"nr_","type":"address"}],"name":"changeAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"compounder","outputs":[{"internalType":"contract ICompounder","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"shares","type":"uint256"}],"name":"convertToAssets","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"assets","type":"uint256"}],"name":"convertToShares","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"assets","type":"uint256"},{"internalType":"address","name":"receiver","type":"address"}],"name":"deposit","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"doHardWork","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"expectedRewards","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_a","type":"address"}],"name":"getAssetPriceUSD","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_offsetLast","type":"uint256"},{"internalType":"uint256","name":"_points","type":"uint256"},{"internalType":"uint256","name":"_window","type":"uint256"}],"name":"getSnapshots","outputs":[{"components":[{"internalType":"uint40","name":"time","type":"uint40"},{"internalType":"uint88","name":"underlyingAPR","type":"uint88"},{"internalType":"uint128","name":"assetPriceUSD","type":"uint128"},{"internalType":"uint128","name":"assets","type":"uint128"},{"internalType":"uint128","name":"shares","type":"uint128"},{"internalType":"uint112","name":"assetTotalSupply","type":"uint112"},{"internalType":"uint64","name":"assetsInFarmlandRatio","type":"uint64"},{"internalType":"uint80","name":"veBackingAssetRatio","type":"uint80"},{"internalType":"uint80","name":"assetPriceInBase","type":"uint80"},{"internalType":"uint96","name":"coinPriceUSD","type":"uint96"},{"internalType":"uint40","name":"interactionID","type":"uint40"},{"internalType":"uint40","name":"sID","type":"uint40"}],"internalType":"struct elitenessERC4626Base.Snapshot[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"who","type":"address"}],"name":"info","outputs":[{"internalType":"uint256[18]","name":"","type":"uint256[18]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"interactions","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"isExpectedReward","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isHardWorking","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastCompounded","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastSnapshot","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"maxDeposit","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"maxMint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"maxRedeem","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"maxWithdraw","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"shares","type":"uint256"},{"internalType":"address","name":"receiver","type":"address"}],"name":"mint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_index","type":"uint256"}],"name":"popExpectedRewards","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"assets","type":"uint256"}],"name":"previewDeposit","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"shares","type":"uint256"}],"name":"previewMint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"shares","type":"uint256"}],"name":"previewRedeem","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"assets","type":"uint256"}],"name":"previewWithdraw","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address[]","name":"_rts","type":"address[]"}],"name":"pushExpectedRewards","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"shares","type":"uint256"},{"internalType":"address","name":"receiver","type":"address"},{"internalType":"address","name":"owner","type":"address"}],"name":"redeem","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amt","type":"uint256"},{"internalType":"address","name":"_token","type":"address"},{"internalType":"address","name":"_to","type":"address"}],"name":"rescue","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_c","type":"address"}],"name":"setCompounder","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_b","type":"bool"}],"name":"setIsHardWorking","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IPriceGuru","name":"_pg","type":"address"}],"name":"setPriceGuru","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"shouldDoHardWork","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"snapshots","outputs":[{"internalType":"uint40","name":"time","type":"uint40"},{"internalType":"uint88","name":"underlyingAPR","type":"uint88"},{"internalType":"uint128","name":"assetPriceUSD","type":"uint128"},{"internalType":"uint128","name":"assets","type":"uint128"},{"internalType":"uint128","name":"shares","type":"uint128"},{"internalType":"uint112","name":"assetTotalSupply","type":"uint112"},{"internalType":"uint64","name":"assetsInFarmlandRatio","type":"uint64"},{"internalType":"uint80","name":"veBackingAssetRatio","type":"uint80"},{"internalType":"uint80","name":"assetPriceInBase","type":"uint80"},{"internalType":"uint96","name":"coinPriceUSD","type":"uint96"},{"internalType":"uint40","name":"interactionID","type":"uint40"},{"internalType":"uint40","name":"sID","type":"uint40"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"takeSnapshot","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"totalAssets","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"tvl","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"assets","type":"uint256"},{"internalType":"address","name":"receiver","type":"address"},{"internalType":"address","name":"owner","type":"address"}],"name":"withdraw","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"}];

function notice(c) {
	window.location = "#note";
	$("content1").innerHTML = c;
	console.log(c);
}

async function dexstats() {
	gubs();
	return;
}

echartsPainted = false;

function arf(){

	var xfr = setInterval(function() {
		console.log("refreshing farm stats", new Date() );
		try {
			//if( ethers.utils.isAddress(window.ethereum.selectedAddress) ) {gubs();}
			gubs();
		}
		catch(e) { console.log('hmm.. gubs errored'); }
	}, 15000);
}

async function gubs() {
	VP = new ethers.Contract(VAULT, VAULTABI, provider);
	VE = new ethers.Contract(VENFT, VEABI, provider);
	lp = new ethers.Contract(WRAP, LPABI, provider);
	fa = new ethers.Contract(FARM, FARABI, provider);
	MGR = new ethers.Contract(MANAGER, MGRABI, provider);
	MC = new ethers.Contract("0xcA11bde05977b3631167028862bE2a173976CA11",[{"inputs":[{"components":[{"internalType":"address","name":"target","type":"address"},{"internalType":"bytes","name":"callData","type":"bytes"}],"internalType":"struct Multicall3.Call[]","name":"calls","type":"tuple[]"}],"name":"aggregate","outputs":[{"internalType":"uint256","name":"blockNumber","type":"uint256"},{"internalType":"bytes[]","name":"returnData","type":"bytes[]"}],"stateMutability":"payable","type":"function"},{"inputs":[{"components":[{"internalType":"address","name":"target","type":"address"},{"internalType":"bool","name":"allowFailure","type":"bool"},{"internalType":"bytes","name":"callData","type":"bytes"}],"internalType":"struct Multicall3.Call3[]","name":"calls","type":"tuple[]"}],"name":"aggregate3","outputs":[{"components":[{"internalType":"bool","name":"success","type":"bool"},{"internalType":"bytes","name":"returnData","type":"bytes"}],"internalType":"struct Multicall3.Result[]","name":"returnData","type":"tuple[]"}],"stateMutability":"payable","type":"function"},{"inputs":[{"components":[{"internalType":"address","name":"target","type":"address"},{"internalType":"bool","name":"allowFailure","type":"bool"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"bytes","name":"callData","type":"bytes"}],"internalType":"struct Multicall3.Call3Value[]","name":"calls","type":"tuple[]"}],"name":"aggregate3Value","outputs":[{"components":[{"internalType":"bool","name":"success","type":"bool"},{"internalType":"bytes","name":"returnData","type":"bytes"}],"internalType":"struct Multicall3.Result[]","name":"returnData","type":"tuple[]"}],"stateMutability":"payable","type":"function"},{"inputs":[{"components":[{"internalType":"address","name":"target","type":"address"},{"internalType":"bytes","name":"callData","type":"bytes"}],"internalType":"struct Multicall3.Call[]","name":"calls","type":"tuple[]"}],"name":"blockAndAggregate","outputs":[{"internalType":"uint256","name":"blockNumber","type":"uint256"},{"internalType":"bytes32","name":"blockHash","type":"bytes32"},{"components":[{"internalType":"bool","name":"success","type":"bool"},{"internalType":"bytes","name":"returnData","type":"bytes"}],"internalType":"struct Multicall3.Result[]","name":"returnData","type":"tuple[]"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"getBasefee","outputs":[{"internalType":"uint256","name":"basefee","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"blockNumber","type":"uint256"}],"name":"getBlockHash","outputs":[{"internalType":"bytes32","name":"blockHash","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getBlockNumber","outputs":[{"internalType":"uint256","name":"blockNumber","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getChainId","outputs":[{"internalType":"uint256","name":"chainid","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getCurrentBlockCoinbase","outputs":[{"internalType":"address","name":"coinbase","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getCurrentBlockDifficulty","outputs":[{"internalType":"uint256","name":"difficulty","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getCurrentBlockGasLimit","outputs":[{"internalType":"uint256","name":"gaslimit","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getCurrentBlockTimestamp","outputs":[{"internalType":"uint256","name":"timestamp","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"addr","type":"address"}],"name":"getEthBalance","outputs":[{"internalType":"uint256","name":"balance","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getLastBlockHash","outputs":[{"internalType":"bytes32","name":"blockHash","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bool","name":"requireSuccess","type":"bool"},{"components":[{"internalType":"address","name":"target","type":"address"},{"internalType":"bytes","name":"callData","type":"bytes"}],"internalType":"struct Multicall3.Call[]","name":"calls","type":"tuple[]"}],"name":"tryAggregate","outputs":[{"components":[{"internalType":"bool","name":"success","type":"bool"},{"internalType":"bytes","name":"returnData","type":"bytes"}],"internalType":"struct Multicall3.Result[]","name":"returnData","type":"tuple[]"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"bool","name":"requireSuccess","type":"bool"},{"components":[{"internalType":"address","name":"target","type":"address"},{"internalType":"bytes","name":"callData","type":"bytes"}],"internalType":"struct Multicall3.Call[]","name":"calls","type":"tuple[]"}],"name":"tryBlockAndAggregate","outputs":[{"internalType":"uint256","name":"blockNumber","type":"uint256"},{"internalType":"bytes32","name":"blockHash","type":"bytes32"},{"components":[{"internalType":"bool","name":"success","type":"bool"},{"internalType":"bytes","name":"returnData","type":"bytes"}],"internalType":"struct Multicall3.Result[]","name":"returnData","type":"tuple[]"}],"stateMutability":"payable","type":"function"}],provider)

	//VI = await VP.info( window.ethereum?.selectedAddress ?? SAFE_ADDR);
	/*
		[
			assetPriceUSD(),
			IVE( IEMinter( IeTHENA(asset()).minter() ).VENFT() ).locked( IEMinter( IeTHENA(asset()).minter() ).ID() ),
			totalAssets(),

			apr(),
			FARMLAND.apr(),

			IERC20(asset()).totalSupply(),
			FARMLAND.totalSupply(),
			totalSupply(),

			IERC20(asset()).balanceOf(who),
			FARMLAND.balanceOf(who),
			balanceOf(who),

			IERC20(asset()).allowance(who,address(this)),
			IERC20(asset()).allowance(who,address(FARMLAND))
		];

	*/
	/*
	ID = await MGR.ID();
	mcalls=[
		{allowFailure: false, target: VP.address, callData: VP.interface.encodeFunctionData("getAssetPriceUSD",[WRAP])} ,
		{allowFailure: false, target: VENFT, callData: VE.interface.encodeFunctionData("locked",[ID])} ,
		{allowFailure: false, target: VP.address, callData: VP.interface.encodeFunctionData("totalAssets",[])} ,

		{allowFailure: false, target: fa.address, callData: VP.interface.encodeFunctionData("apr",[])} ,
		{allowFailure: false, target: fa.address, callData: VP.interface.encodeFunctionData("apr",[])} ,

		{allowFailure: false, target: lp.address, callData: lp.interface.encodeFunctionData("totalSupply",[])} ,
		{allowFailure: false, target: fa.address, callData: fa.interface.encodeFunctionData("totalSupply",[])} ,
		{allowFailure: false, target: VP.address, callData: VP.interface.encodeFunctionData("totalSupply",[])} ,

		{allowFailure: false, target: lp.address, callData: lp.interface.encodeFunctionData("balanceOf",[window.ethereum?.selectedAddress ?? SAFE_ADDR])} ,
		{allowFailure: false, target: fa.address, callData: fa.interface.encodeFunctionData("balanceOf",[window.ethereum?.selectedAddress ?? SAFE_ADDR])} ,
		{allowFailure: false, target: VP.address, callData: VP.interface.encodeFunctionData("balanceOf",[window.ethereum?.selectedAddress ?? SAFE_ADDR])} ,

		{allowFailure: false, target: lp.address, callData: lp.interface.encodeFunctionData("allowance",[window.ethereum?.selectedAddress ?? SAFE_ADDR, VP.address])} ,
		{allowFailure: false, target: lp.address, callData: lp.interface.encodeFunctionData("allowance",[window.ethereum?.selectedAddress ?? SAFE_ADDR, fa.address])} ,
	]

	VI2 = await MC.callStatic.aggregate3(mcalls);
	VI = VI2.map(i=>i[1]);
	VI[1] = VI[1].substr(0,66);
	VI = VI.map(i=>BigInt(i));
	[
		0	uint256(getAssetPriceUSD(asset())),
		1	IVE( IEMinter( IeTHENA(asset()).minter() ).VENFT() ).locked( IEMinter( IeTHENA(asset()).minter() ).ID() ) ,
		2	totalAssets(),

		3	apr(),
		4	FARMLAND.apr(),

		5	IERC20(asset()).totalSupply(),
		6	FARMLAND.totalSupply(),
		7	totalSupply(),

		8	IERC20(asset()).balanceOf(who),
		9	FARMLAND.balanceOf(who),
		10	balanceOf(who),

		11	IERC20(asset()).allowance(who,address(this)),
		12	IERC20(asset()).allowance(who,address(FARMLAND)),

		13	IVE( IEMinter( IeTHENA(asset()).minter() ).VENFT() ).totalSupply(),
		14	getAssetPriceUSD(expectedRewards[0]),
		15	getAssetPriceUSD(IVE( IEMinter( IeTHENA(asset()).minter() ).VENFT() ).token()),

		16	interactions,
		17	lastSnapshot
		];

]

	minter.info
	tg.coinusd
	tg.p_(THE)

	mcalls2=[
		{allowFailure: false, target: "0xD600Ec98cf6418c50EE051ACE53219D95AeAa134", callData: "0xedb0f3b00000000000000000000000009798a3835c8c87bd92803c3a248ae0042fbe4c6c"},
		{allowFailure: false, target: "0xD600Ec98cf6418c50EE051ACE53219D95AeAa134", callData: "0x159fb692"},
		{allowFailure: false, target: "0xD600Ec98cf6418c50EE051ACE53219D95AeAa134", callData: "0xedb0f3b000000000000000000000000063db6ba9e512186c2faadacef342fb4a40dc577c"},
		{allowFailure: false, target: "0xcba004CeA7126D3BA1A09DB26cbB8F4444A1b14C", callData: "0x547b13e200000000000000000000000000000000000000000000000000000000000012340000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"},
	]
	*/
	VI = await VP.info( window.ethereum?.selectedAddress ?? SAFE_ADDR);

	$("bal_lp").innerHTML = bigIntToDecimal( VI[8] , 18);
	$("bal_fa").innerHTML = Number(VI[7])==0 ? 0 : bigIntToDecimal( BigInt(VI[2]) * BigInt(VI[10]) / BigInt(VI[7]) , 18);
	$("istat-assets").innerHTML = fornum5(VI[2],18,2);
	$("istat-shares").innerHTML = fornum5(VI[7],18,2);
	$("istat-ratio").innerHTML = Number(VI[7])==0 ? 0 : fornum5( Number(VI[2]) / Number(VI[7]) , 0 , 6) +"x";
	$("istat-veratio").innerHTML = Number(VI[7])==0 ? 0 : fornum5( ( (Number(VI[1]) / Number(VI[5])) * (Number(VI[2])/Number(VI[7])) ) , 0 , 6) +"x";
	$("istat-tvlusd").innerHTML = "$"+ fornum5( Number(VI[0])/1e18 * Number(VI[2])/1e18 , 0 , 2) ;
	$("istat-apy").innerHTML = fornum5( ((1+Number(VI[3])/1e18/100/1000)**1000-1)*100, 0, 2) + "%";

	promptRedeposit()

	if(!echartsPainted) {
		lastComp = await VP.lastCompounded();
		$("istats-info-lastcomp").innerHTML = "Last compounding cycle happened " + timeFormat(Number(lastComp)*1e3).replace("Expired","");
		_allsnaps = await VP.getSnapshots(0,10000,1);
		allsnaps = _allsnaps.slice(0,_allsnaps.length-1);
		//allsnaps = [ ...allsnaps, ...ETHENA_OLD_STATS_SNAP];

		allsnaps=allsnaps.map(i=>i.map((je,ji) => Number(je) / ( ji==0 ? 0.001 : (ji<10 ? 1e18 : 1) ) ) )
		//console.log({allsnaps,ETHENA_OLD_STATS_SNAP})
		/*
	struct Snapshot {
	0	uint40 time;
	1	uint88 underlyingAPR;
	2	uint128 assetPriceUSD;

	3	uint128 assets;
	4	uint128 shares;

	5	uint112 assetTotalSupply;
	6	uint64 assetsInFarmlandRatio;
	7	uint80 veBackingAssetRatio;

	8	uint80 assetPriceInBase;
	9	uint96 coinPriceUSD;

	10	uint40 interactionID;
	11	uint40 sID;
	}






d4=d3.map(i=>[
	i.timestamp,
	i.farm?i.farm[0]:0,
	i.mcd?i.mcd[0]:0,
	0,
	0,
	i.mcd?i.mcd[3][1]:0,
	i.farm&&i.mcd?i.farm[1]*1e18/i.mcd[3][1],
	i.mcd?i.mcd[3][7]*1e18/i.mcd[3][1]:0,
	i.mcd?i.mcd[0]/i.mcd[2]:0,
	i.mcd?i.mcd[1]:0,
	0,
	i.dayid


		*/
		sd = allsnaps.map( i => ({
			sid: i[11]  || 0,
			time: i[0] ,

			priceAssetInUSD: i[2] || 0 ,
			priceBaseInUSD: (i[2] / i[8]) ?? 0 ,
			priceShareInUSD: (i[2] * i[3] / i[4]) || 0 ,

			underlyingAPR: i[1]  || 0,
			expectedAPY: (i[0] < 1758931191e3 ? 0 : (( (1+i[1]/100/365)**365 -1 )*100 )) || 0,
			realizedAPR_ma1: i[1]  || 0,
			realizedAPR_ma7: i[1]  || 0,
			realizedAPR_ma30: i[1]  || 0,

			assetsTotalSupply: i[5]  || 0,
			assetsInFarmland: i[6]*i[5] || 0,
			assetsInVault: i[3] || 0,
			sharesIssued: i[4] || 0,
			backingTotal: i[7]*i[5] || 0,

			assetsPerShare: (i[3]/i[4]) || 0,
			backingPerAsset: i[7] || 0,
			backingPerShare: (i[7] * i[3]/i[4]) || 0 ,

			tvlBackingUSD: (i[7]*i[5] * i[2] / i[8]) || 0 ,
			tvlFarmlandUSD: i[6]*i[5] *i[2]  || 0,
			tvlSharesUSD: i[2] * i[3]  || 0,
			tvlAssetsUSD: i[2] * i[5]  || 0,
		}) );

		sd.sort((a,b)=>a.time<b.time);
		console.log(sd,"excl. 0th snap");
		await paintCharts(sd);
	}
	return;
}

async function paintCharts(TADATA) {
// constants
areaStyles = [
	  {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgb(255, 191, 0)'
          },
          {
            offset: 1,
            color: 'rgb(224, 62, 76)'
          }
        ])
      },
      {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgb(255, 0, 135)'
          },
          {
            offset: 1,
            color: 'rgb(135, 0, 157)'
          }
        ])
      },
      {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgb(55, 162, 255)'
          },
          {
            offset: 1,
            color: 'rgb(116, 21, 219)'
          }
        ])
      },
      {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgb(0, 221, 255)'
          },
          {
            offset: 1,
            color: 'rgb(77, 119, 255)'
          }
        ])
      },
      {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgb(128, 255, 165)'
          },
          {
            offset: 1,
            color: 'rgb(1, 191, 236)'
          }
        ])
      },
].reverse()



// priceUSD - THE, eTHENA, stakeTHENA
// priceTHE - THE/THE=(1), eTHENA/THE, stakeTHENA/THE
// ratios - veTHE per eTHENA, veTHE per stakeTHENA
// yields - instantaneous APR, instantaneous APY, 7-snap avgs, 30-snap avgs
// TVL_USD - veTHE held, eTHENA mktcap, Farmland TVL, stakeTHENA TVL
// TVL_THE - veTHE held, eTHENA supply, farmland supply, stakeTHENA isssued, eTHENA in Farmland

eo0 = {
  toolbox: {
    feature: {
      dataView: { show: true, readOnly: false },
      magicType: { show: true, type: ['line', 'bar'] },
      restore: { show: true },
      saveAsImage: { show: true },
    },
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985'
      }
    }
  },
  legend: { type: 'scroll', bottom:15 },
  xAxis: {type:'time'},
  yAxis: {type:'value'},
  dataZoom: [
    {
      type: 'slider',
      show: true,
      xAxisIndex: [0],
      start: 0,
      end: 100
    },
    {
      type: 'inside',
      xAxisIndex: [0],
    },
  ],
}






eo_tvl_the = {
  ...eo0 ,
  title: {left: 'center', top: 10, text: "Growth in Token amounts"},
  series: [
    {
      name: 'Total veTHE Backing',
      type: 'line',
      smooth: true,
      emphasis: { focus: 'series' },
      data: TADATA.map(i=>([i.time,i.backingTotal.toFixed(0)])).filter(i=>isFinite(i[1])&&Number(i[1])!=0),
      areaStyle: areaStyles[0],
    },
    {
      name: 'Total eTHENA Issued',
      type: 'line',
      smooth: true,
      emphasis: { focus: 'series' },
      data: TADATA.map(i=>([i.time,i.assetsTotalSupply.toFixed(0)])).filter(i=>isFinite(i[1])&&Number(i[1])!=0),
      areaStyle: areaStyles[1],
    },
    {
      name: 'eTHENA in Farmland',
      type: 'line',
      smooth: true,
      emphasis: { focus: 'series' },
      data: TADATA.map(i=>([i.time,i.assetsInFarmland.toFixed(0)])).filter(i=>isFinite(i[1])&&Number(i[1])!=0),
      areaStyle: areaStyles[2],
    },
    {
      name: 'eTHENA in Vault',
      type: 'line',
      smooth: true,
      emphasis: { focus: 'series' },
      data: TADATA.map(i=>([i.time,i.assetsInVault.toFixed(0)])).filter(i=>isFinite(i[1])&&Number(i[1])!=0),
      areaStyle: areaStyles[3],
    },
    {
      name: 'stakeTHENA Issued',
      type: 'line',
      smooth: true,
      emphasis: { focus: 'series' },
      data: TADATA.map(i=>([i.time,i.sharesIssued.toFixed(0)])).filter(i=>isFinite(i[1])&&Number(i[1])!=0),
      //areaStyle: areaStyles[4],
    },
  ],
  legend: {
    ...eo0.legend,
    show:true,
    selected:{
      'Total veTHE Backing': false,
      'Total eTHENA Issued': false,
      'eTHENA in Farmland': false,
    }
  }
}







eo_tvl_usd = {
  ...eo0 ,
  title: {left: 'center', top: 10, text: "Growth in TVL (in USD)"},
  series: [
    {
      name: 'veTHE Locked (USD)',
      type: 'line',
      smooth: true,
      emphasis: { focus: 'series' },
      data: TADATA.map(i=>([i.time,i.tvlBackingUSD.toFixed(0)])).filter(i=>isFinite(i[1])&&Number(i[1])!=0),
      areaStyle: areaStyles[0],
    },
    {
      name: 'eTHENA MktCap (USD)',
      type: 'line',
      smooth: true,
      emphasis: { focus: 'series' },
      data: TADATA.map(i=>([i.time,i.tvlAssetsUSD.toFixed(0)])).filter(i=>isFinite(i[1])&&Number(i[1])!=0),
      areaStyle: areaStyles[1],
    },
    {
      name: 'Staking TVL (USD)',
      type: 'line',
      smooth: true,
      emphasis: { focus: 'series' },
      data: TADATA.map(i=>([i.time,i.tvlFarmlandUSD.toFixed(0)])).filter(i=>isFinite(i[1])&&Number(i[1])!=0),
      areaStyle: areaStyles[2],
    },
    {
      name: 'TVL in stakeTHENA (USD)',
      type: 'line',
      smooth: true,
      emphasis: { focus: 'series' },
      data: TADATA.map(i=>([i.time,i.tvlSharesUSD.toFixed(0)])).filter(i=>isFinite(i[1])&&Number(i[1])!=0),
      areaStyle: areaStyles[3],
    },
  ],
  legend: {
    ...eo0.legend,
    show:true,
    selected:{
      'veTHE Locked (USD)': false,
      'eTHENA MktCap (USD)': false,
    }
  }
}




eo_yields = {
  ...eo0 ,
  title: {left: 'center', top: 10, text: "Historical Yields"},
  series: [
    {
      name: 'stakeTHENA APY',
      type: 'line',
      smooth: true,
      emphasis: { focus: 'series' },
      data: TADATA.map(i=>([i.time,i.expectedAPY.toFixed(2)])).filter(i=>isFinite(i[1])&&Number(i[1])!=0),
      areaStyle: areaStyles[4],
    },
    {
      name: 'Direct Staking APR',
      type: 'line',
      smooth: true,
      emphasis: { focus: 'series' },
      data: TADATA.map(i=>([i.time,i.underlyingAPR.toFixed(2)])).filter(i=>isFinite(i[1])&&Number(i[1])!=0),
      areaStyle: areaStyles[0],
    },
  ]
}







eo_ratios = {
  ...eo0 ,
  title: {left: 'center', top: 10, text: "Growth in Relative Ratios"},
  series: [
    {
      name: 'veTHE backing per stakeTHENA',
      type: 'line',
      smooth: true,
      emphasis: { focus: 'series' },
      data: TADATA.map(i=>([i.time,i.backingPerShare.toFixed(6)])).filter(i=>isFinite(i[1])&&Number(i[1])!=0),
      areaStyle: areaStyles[1],
    },
    {
      name: 'veTHE backing per eTHENA',
      type: 'line',
      smooth: true,
      emphasis: { focus: 'series' },
      data: TADATA.map(i=>([i.time,i.backingPerAsset.toFixed(6)])).filter(i=>isFinite(i[1])&&Number(i[1])!=0),
      areaStyle: areaStyles[2],
    },
    {
      name: 'eTHENA per stakeTHENA',
      type: 'line',
      smooth: true,
      emphasis: { focus: 'series' },
      data: TADATA.map(i=>([i.time,i.assetsPerShare.toFixed(6)])).filter(i=>isFinite(i[1])&&Number(i[1])!=0),
      areaStyle: areaStyles[4],
    },
    {
      name: 'THE/THE=1 Reference',
      type: 'line',
      smooth: true,
      emphasis: { focus: 'series' },
      data: TADATA.map(i=>([i.time,(1).toFixed(6)])).filter(i=>isFinite(i[1])&&Number(i[1])!=0),
      lineStyle: {color:"black"},
      itemStyle: {color:"black"},
    },
  ],
  yAxis: {
    ...eo0.yAxis,
    startValue: 1,
  },
  legend: {
    ...eo0.legend,
    show:true,
    selected:{
      'veTHE backing per stakeTHENA': false,
      'veTHE backing per eTHENA': false
    }
  }
}



eo_price_the = {
  ...eo0 ,
  title: {left: 'center', top: 10, text: "Prices Relative to THE"},
  series: [
    {
      name: 'veTHE backing per stakeTHENA',
      type: 'line',
      smooth: true,
      emphasis: { focus: 'series' },
      data: TADATA.map(i=>([i.time,i.backingPerAsset.toFixed(6)])).filter(i=>isFinite(i[1])&&Number(i[1])!=0),
      areaStyle: areaStyles[0],
    },
    {
      name: 'veTHE backing per eTHENA',
      type: 'line',
      smooth: true,
      emphasis: { focus: 'series' },
      data: TADATA.map(i=>([i.time,i.backingPerShare.toFixed(6)])).filter(i=>isFinite(i[1])&&Number(i[1])!=0),
      areaStyle: areaStyles[1],
    },
    {
      name: 'eTHENA/THE Market Price',
      type: 'line',
      smooth: true,
      emphasis: { focus: 'series' },
      data: TADATA.map(i=>([i.time,(i.priceAssetInUSD/i.priceBaseInUSD).toFixed(6)])).filter(i=>isFinite(i[1])&&Number(i[1])!=0),
      areaStyle: areaStyles[2],
    },
    {
      name: 'stakeTHENA/THE Market Price',
      type: 'line',
      smooth: true,
      emphasis: { focus: 'series' },
      data: TADATA.map(i=>([i.time,(i.priceShareInUSD/i.priceBaseInUSD).toFixed(6)])).filter(i=>isFinite(i[1])&&Number(i[1])!=0),
      areaStyle: areaStyles[3],
    },
    {
      name: 'THE/THE=1 Reference',
      type: 'line',
      lineStyle: {color:"black"},
      itemStyle: {color:"black"},
      smooth: true,
      emphasis: { focus: 'series' },
      data: TADATA.map(i=>([i.time,(1).toFixed(6)])).filter(i=>isFinite(i[1])&&Number(i[1])!=0),
    },
  ],
  yAxis: {
    ...eo0.yAxis,
    //startValue: (Math.min(...TADATA.map(i=>i.priceAssetInUSD/i.priceBaseInUSD) )*0.95).toFixed(1)
  }
}


eo_price_usd = {
  ...eo0 ,
  title: {left: 'center', top: 10, text: "Open-Market Prices in USD"},
  series: [
    {
      name: 'THE (USD Price)',
      type: 'line',
      smooth: true,
      emphasis: { focus: 'series' },
      data: TADATA.map(i=>([i.time,i.priceBaseInUSD.toFixed(6)])).filter(i=>isFinite(i[1])&&Number(i[1])!=0),
    },
    {
      name: 'eTHENA (USD Price)',
      type: 'line',
      smooth: true,
      emphasis: { focus: 'series' },
      data: TADATA.map(i=>([i.time,(i.priceAssetInUSD).toFixed(6)])).filter(i=>isFinite(i[1])&&Number(i[1])!=0),
    },
    {
      name: 'stakeTHENA (USD Price)',
      type: 'line',
      smooth: true,
      emphasis: { focus: 'series' },
      data: TADATA.map(i=>([i.time,(i.priceShareInUSD).toFixed(6)])).filter(i=>isFinite(i[1])&&Number(i[1])!=0),
    },
  ]
}












echart1 = echarts.init(document.getElementById('echart-1'),'dark'); echart1.setOption(eo_tvl_the);
echart2 = echarts.init(document.getElementById('echart-2'),'dark');	echart2.setOption(eo_tvl_usd);
echart3 = echarts.init(document.getElementById('echart-3'),'dark'); echart3.setOption(eo_yields);
echart4 = echarts.init(document.getElementById('echart-4'),'dark'); echart4.setOption(eo_ratios);
echart5 = echarts.init(document.getElementById('echart-5'),'dark');	echart5.setOption(eo_price_the);
echart6 = echarts.init(document.getElementById('echart-6'),'dark');	echart6.setOption(eo_price_usd);



echartsPainted = true;
}


async function pre_stats() {
	//gubs();
	return;
}

async function deposit(ismax) {
	lp = new ethers.Contract(WRAP, LPABI, signer);
	fa = new ethers.Contract(FARM, FARABI, signer);
	va = new ethers.Contract(VAULT, VAULTABI, signer);
	al = await Promise.all([
		lp.allowance(window.ethereum.selectedAddress, VAULT),
		lp.balanceOf(window.ethereum.selectedAddress)
	]);
	let amt = 0;
	am = $("in_d").value;
	if(ismax) {amt = al[1]; }
	else {
		if(!isFinite(am) || am<1/1e18) {notice(`<h2>Please increase amount!</h2>You have entered an invalid or zero amount.<br><br>Your input: ${am}`);return}
		amt = BigInt(Math.floor(am*1e18));
	}
	if(Number(amt)>Number(al[1])) {notice(`<h2>Insufficient Balance!</h2><h3>Desired Stake:</h3>${amt/1e18}<br><h3>Actual Balance:</h3>${al[1]/1e18}<br><br><b>Please reduce the amount and retry again, or accumulate some more ${WRAPNAME}.`);}
	if(Number(amt)>Number(al[0])){
		notice(`
			<h3>Approval required</h3>
			${WRAPNAME} requires your approval for Staking.<br><br>
			<h4><u><i>Please Confirm this transaction in your wallet!</i></u></h4>
		`);
		let _tr = await lp.approve(VAULT,ethers.constants.MaxUint256);
		console.log(_tr);
		notice(`
			<h3>Submitting Approval Transaction!</h3>
			<h4><a target="_blank" href="${EXPLORE}/tx/${_tr.hash}">View on Explorer</a></h4>
		`);
		_tw = await _tr.wait()
		console.log(_tw)
		notice(`
			<h3>Approval Completed!</h3>
			<br>Spending rights granted on ${WRAPNAME}.<br>
			<h4><a target="_blank" href="${EXPLORE}/tx/${_tr.hash}">View on Explorer</a></h4>
			<br><br>
			Please confirm the next step your wallet provider now.
		`);
	}
	notice(`
		<h3>Depositing ${WRAPNAME}</h3>
		<img style='height:20px;position:relative;top:4px' src="${WRAPLOGO}">
		<u>${ fornum(amt,18).toLocaleString() } ${WRAPNAME}</u><br><br>
		<h4><u><i>Please Confirm this transaction in your wallet!</i></u></h4>
	`);
	let _tr = await va.deposit(amt, window.ethereum.selectedAddress);
	console.log(_tr);
	notice(`
		<h3>Depositing ${WRAPNAME}!</h3>
		Get ready to start enjoying ${TEARNSYM.join(" + ")} rewards!<br>
		<h4><a target="_blank" href="${EXPLORE}/tx/${_tr.hash}">View on Explorer</a></h4>
	`);
	_tw = await _tr.wait()
	console.log(_tw)
	notice(`
		<h3>Deposit Successful!</h3>
		<br>Amount Deposited:<br>
		<img style='height:20px;position:relative;top:4px' src="${WRAPLOGO}">
		<u>${ fornum(amt,18).toLocaleString() } ${WRAPNAME}</u><br><br>
		<h4><a target="_blank" href="${EXPLORE}/tx/${_tr.hash}">View on Explorer</a></h4>
	`);
}

async function withdraw(ismax) {
	lp = new ethers.Contract(WRAP, LPABI, signer);
	fa = new ethers.Contract(FARM, FARABI, signer);
	va = new ethers.Contract(VAULT, VAULTABI, signer);
	//_vi = await va.info(window.ethereum.selectedAddress);
	al = await Promise.all([
		va.maxWithdraw(window.ethereum.selectedAddress)//fa.balanceOf(window.ethereum.selectedAddress)
	]);
	let amt = 0;
	am = $("in_w").value;
	if(ismax) {amt = al[0]; }
	else {
		if(!isFinite(am) || am<1/1e18) {notice(`<h2>Please decrease amount!</h2>You have entered an invalid or exaggerated amount.<br><br>Your input: ${am}`);return}
		amt = BigInt(Math.floor(am*1e18));
	}
	if(Number(amt)>Number(al[0])) {notice(`<h2>Insufficient Balance Staked!</h2><h3>Desired Stake:</h3>${amt/1e18}<br><h3>Actual Staked:</h3>${al[1]/1e18}<br><br><b>Please reduce the amount and retry again to unstake ${WRAPNAME}.`);}
	notice(`
		<h3>Withdrawing ${WRAPNAME}</h3>
		<img style='height:20px;position:relative;top:4px' src="${WRAPLOGO}">
		<u>${ fornum(amt,18).toLocaleString() } ${WRAPNAME}</u><br><br>
		<h4><u><i>Please Confirm this transaction in your wallet!</i></u></h4>
	`);
	let _tr = await va.withdraw(amt,window.ethereum.selectedAddress,window.ethereum.selectedAddress);
	console.log(_tr);
	notice(`
		<h3>Withdrawing ${WRAPNAME}!</h3>
		We hope you are enjoying your ${TEARNSYM.join(" + ")} rewards!<br>
		<h4><a target="_blank" href="${EXPLORE}/tx/${_tr.hash}">View on Explorer</a></h4>
	`);
	_tw = await _tr.wait()
	console.log(_tw)
	notice(`
		<h3>eTHENA Received!</h3>
		<br>Amount Withdrawn:<br>
		<img style='height:20px;position:relative;top:4px' src="${WRAPLOGO}">
		<u>${ fornum(amt,18).toLocaleString() } ${WRAPNAME}</u><br><br>
		<h4><a target="_blank" href="${EXPLORE}/tx/${_tr.hash}">View on Explorer</a></h4>
	`);
}





prompted=false;

async function promptRedeposit() {
	if (prompted == true || (window?.ethereum?.selectedAddress?.length != 42)) { return; }
	if (prompted == false) {
		old_v2 = new ethers.Contract(VAULT_OLD_2, VAULTABI, signer);
		old_v3 = new ethers.Contract(VAULT_OLD_3, VAULTABI, signer);
		let oub = await Promise.all([
			old_v2.balanceOf(window.ethereum.selectedAddress),
			old_v3.balanceOf(window.ethereum.selectedAddress)
		]);
		oub = oub.map(i=> BigInt(i));
		if( oub[0] == 0n && oub[1] == 0n) {
			prompted = true;
			return;
		}
		else {
			notice(`Thank you for helping test the alpha & beta versions of stakeTHENA Vault! We request you to withdraw from these old vaults and redeposit again in the new final stakeTHENA Vault. You have ${Number(oub[0])/1e18} in Old Vault 2 & ${Number(oub[1])/1e18} in Old Vault 3.<br><br>Withdrawing All from Test Vaults now ...<br><br> We will send a reward soon to your wallet for helping us! 🙏<br><br>`);
			if(oub[0] > 0n) { await (await old_v2.redeem(oub[0], window.ethereum.selectedAddress, window.ethereum.selectedAddress)).wait(); }
			if(oub[1] > 0n) { await (await old_v3.redeem(oub[1], window.ethereum.selectedAddress, window.ethereum.selectedAddress)).wait(); }
			notice(`
				<h3>Withdrawn Old Test Vault Deposits</h3>
			`);
			prompted = true;
		}
	}
}