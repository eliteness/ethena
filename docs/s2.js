function $(_) {return document.getElementById(_);}
let provider= {};
let signer= {};
ZERO_ADDR = "0x0000000000000000000000000000000000000000";
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
	if(_n>1e18){n_=(_n/1e18).toFixed(3)+"Qt"}
	else if(_n>1e15){n_=(_n/1e15).toFixed(3)+"Qd"}
	else if(_n>1e12){n_=(_n/1e12).toFixed(3)+"T"}
	else if(_n>1e9){n_=(_n/1e9).toFixed(3)+"B"}
	else if(_n>1e6){n_=(_n/1e6).toFixed(3)+"M"}
	else if(_n>1e3){n_=(_n/1e3).toFixed(3)+"K"}
	else if(_n>1e1){n_=(_n/1e0).toFixed(3)+""}
	else if(_n>1e0){n_=(_n/1e0).toFixed(5)+""}
	else if(_n>0.0){n_=(_n/1e0).toFixed(8)+""}
	return(n_);
}

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

VEABI = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"delegator","type":"address"},{"indexed":true,"internalType":"address","name":"fromDelegate","type":"address"},{"indexed":true,"internalType":"address","name":"toDelegate","type":"address"}],"name":"DelegateChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"delegate","type":"address"},{"indexed":false,"internalType":"uint256","name":"previousBalance","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"newBalance","type":"uint256"}],"name":"DelegateVotesChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"provider","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"},{"indexed":true,"internalType":"uint256","name":"locktime","type":"uint256"},{"indexed":false,"internalType":"enum VotingEscrow.DepositType","name":"deposit_type","type":"uint8"},{"indexed":false,"internalType":"uint256","name":"ts","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint8","name":"version","type":"uint8"}],"name":"Initialized","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"prevSupply","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"supply","type":"uint256"}],"name":"Supply","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"provider","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"ts","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"DELEGATION_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"DOMAIN_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAX_DELEGATES","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"abstain","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_approved","type":"address"},{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"artProxy","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"attach","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"attachments","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"uint256","name":"_block","type":"uint256"}],"name":"balanceOfAtNFT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"balanceOfNFT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"uint256","name":"_t","type":"uint256"}],"name":"balanceOfNFTAt","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"block_number","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"checkpoint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint32","name":"","type":"uint32"}],"name":"checkpoints","outputs":[{"internalType":"uint256","name":"timestamp","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_value","type":"uint256"},{"internalType":"uint256","name":"_lock_duration","type":"uint256"}],"name":"create_lock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_value","type":"uint256"},{"internalType":"uint256","name":"_lock_duration","type":"uint256"},{"internalType":"address","name":"_to","type":"address"}],"name":"create_lock_for","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"delegatee","type":"address"}],"name":"delegate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"delegatee","type":"address"},{"internalType":"uint256","name":"nonce","type":"uint256"},{"internalType":"uint256","name":"expiry","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"delegateBySig","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"delegator","type":"address"}],"name":"delegates","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"uint256","name":"_value","type":"uint256"}],"name":"deposit_for","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"detach","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"epoch","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"getPastTotalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"getPastVotes","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"getPastVotesIndex","outputs":[{"internalType":"uint32","name":"","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"getVotes","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"get_last_user_slope","outputs":[{"internalType":"int128","name":"","type":"int128"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"uint256","name":"_value","type":"uint256"}],"name":"increase_amount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"uint256","name":"_value","type":"uint256"}],"name":"increase_amount_for","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"uint256","name":"_lock_duration","type":"uint256"}],"name":"increase_unlock_time","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token_addr","type":"address"},{"internalType":"address","name":"art_proxy","type":"address"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"},{"internalType":"address","name":"_operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_spender","type":"address"},{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"isApprovedOrOwner","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"locked","outputs":[{"internalType":"int128","name":"amount","type":"int128"},{"internalType":"uint256","name":"end","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"locked__end","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_from","type":"uint256"},{"internalType":"uint256","name":"_to","type":"uint256"}],"name":"merge","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"nonces","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"numCheckpoints","outputs":[{"internalType":"uint32","name":"","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"ownership_change","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"point_history","outputs":[{"internalType":"int128","name":"bias","type":"int128"},{"internalType":"int128","name":"slope","type":"int128"},{"internalType":"uint256","name":"ts","type":"uint256"},{"internalType":"uint256","name":"blk","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_from","type":"address"},{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_from","type":"address"},{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_operator","type":"address"},{"internalType":"bool","name":"_approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_proxy","type":"address"}],"name":"setArtProxy","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_team","type":"address"}],"name":"setTeam","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_voter","type":"address"}],"name":"setVoter","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"slope_changes","outputs":[{"internalType":"int128","name":"","type":"int128"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"supply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes4","name":"_interfaceID","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"team","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"token","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"},{"internalType":"uint256","name":"_tokenIndex","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_block","type":"uint256"}],"name":"totalSupplyAt","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"t","type":"uint256"}],"name":"totalSupplyAtT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_from","type":"address"},{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"user_point_epoch","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"user_point_history","outputs":[{"internalType":"int128","name":"bias","type":"int128"},{"internalType":"int128","name":"slope","type":"int128"},{"internalType":"uint256","name":"ts","type":"uint256"},{"internalType":"uint256","name":"blk","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"uint256","name":"_idx","type":"uint256"}],"name":"user_point_history__ts","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"version","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"voted","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"voter","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"voting","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]

VMABI = [{"inputs":[{"internalType":"address","name":"ve","type":"address"},{"internalType":"address","name":"e","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"","type":"address"},{"indexed":true,"internalType":"uint256","name":"","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"","type":"uint256"}],"name":"Deposit","type":"event"},{"inputs":[],"name":"ELR","outputs":[{"internalType":"contract IELR","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ID","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"converted","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"dao","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"deposit","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"minted","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"bytes","name":"","type":"bytes"}],"name":"onERC721Received","outputs":[{"internalType":"bytes4","name":"","type":"bytes4"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"price","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"quote","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_inc","type":"uint256"}],"name":"rawQuote","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_t","type":"address"},{"internalType":"uint256","name":"_a","type":"uint256"}],"name":"rescue","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"d","type":"address"}],"name":"setDAO","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"setID","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"supplied","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"veRAM","outputs":[{"internalType":"contract IVotingEscrow","name":"","type":"address"}],"stateMutability":"view","type":"function"}]

FARABI = [{"inputs":[{"internalType":"address","name":"_stakingToken","type":"address"},{"internalType":"address","name":"_tg","type":"address"},{"internalType":"bytes","name":"_tf","type":"bytes"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"oldOwner","type":"address"},{"indexed":false,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnerChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnerNominated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bool","name":"isPaused","type":"bool"}],"name":"PauseChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"token","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Recovered","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"token","type":"address"},{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"address","name":"rewardsToken","type":"address"},{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardPaid","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"token","type":"address"},{"indexed":false,"internalType":"uint256","name":"newDuration","type":"uint256"}],"name":"RewardsDurationUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Staked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdrawn","type":"event"},{"constant":true,"inputs":[],"name":"TvlGuru","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"TvlPriceFeed","outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"acceptOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_rewardsToken","type":"address"},{"internalType":"address","name":"_rewardsDistributor","type":"address"},{"internalType":"uint256","name":"_rewardsDuration","type":"uint256"},{"internalType":"bytes","name":"_TvlPriceFeed","type":"bytes"}],"name":"addReward","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"apr","outputs":[{"internalType":"uint256","name":"_apr","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"i","type":"uint256"}],"name":"apr","outputs":[{"internalType":"uint256","name":"_apr","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"aprs","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"address","name":"_rewardsToken","type":"address"}],"name":"earned","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"address","name":"_rewardsToken","type":"address"}],"name":"earnings","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"_user","type":"address"},{"internalType":"address[]","name":"_tokens","type":"address[]"}],"name":"earningsList","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"exit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"feePerMillion","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"feeTaker","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},/* {"constant":false,"inputs":[{"internalType":"address[]","name":"_rewardsTokens","type":"address[]"},{"internalType":"address","name":"_ben","type":"address"}],"name":"getReward","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"getReward","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}	,{"constant":false,"inputs":[{"internalType":"address[]","name":"_rewardsTokens","type":"address[]"}],"name":"getReward","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},	*/ {"constant":false,"inputs":[{"internalType":"address","name":"_rewardsToken","type":"address"}],"name":"getReward","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}	,{"constant":true,"inputs":[{"internalType":"address","name":"_rewardsToken","type":"address"}],"name":"getRewardForDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"lastPauseTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"_rewardsToken","type":"address"}],"name":"lastTimeRewardApplicable","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_owner","type":"address"}],"name":"nominateNewOwner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"nominatedOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_rewardsToken","type":"address"},{"internalType":"uint256","name":"reward","type":"uint256"}],"name":"notifyRewardAmount","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"tokenAddress","type":"address"},{"internalType":"uint256","name":"tokenAmount","type":"uint256"}],"name":"recoverERC20","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"rewardData","outputs":[{"internalType":"address","name":"rewardsDistributor","type":"address"},{"internalType":"uint256","name":"rewardsDuration","type":"uint256"},{"internalType":"uint256","name":"periodFinish","type":"uint256"},{"internalType":"uint256","name":"rewardRate","type":"uint256"},{"internalType":"uint256","name":"lastUpdateTime","type":"uint256"},{"internalType":"uint256","name":"rewardPerTokenStored","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"_rewardsToken","type":"address"}],"name":"rewardPerToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"rewardTokens","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rewardTokensLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rewardTokensList","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"rewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"_f","type":"uint256"}],"name":"setFee","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_f","type":"address"}],"name":"setFeeTaker","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"bool","name":"_paused","type":"bool"}],"name":"setPaused","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_rewardsToken","type":"address"},{"internalType":"address","name":"_rewardsDistributor","type":"address"}],"name":"setRewardsDistributor","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_rewardsToken","type":"address"},{"internalType":"uint256","name":"_rewardsDuration","type":"uint256"}],"name":"setRewardsDuration","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_t","type":"address"},{"internalType":"bytes","name":"_d","type":"bytes"}],"name":"setTvlFeed","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address[]","name":"_t","type":"address[]"},{"internalType":"bytes[]","name":"_d","type":"bytes[]"}],"name":"setTvlFeed","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_tg","type":"address"}],"name":"setTvlGuru","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"stake","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"stakeAll","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"stakingToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"tvl","outputs":[{"internalType":"uint256","name":"_tvl","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"userRewardPerTokenPaid","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"withdrawAll","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]

LPABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"Burn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":true,"internalType":"address","name":"recipient","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"}],"name":"Claim","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"}],"name":"Fees","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"}],"name":"Mint","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0In","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1In","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount0Out","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1Out","type":"uint256"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"Swap","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"reserve0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"reserve1","type":"uint256"}],"name":"Sync","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"blockTimestampLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"burn","outputs":[{"internalType":"uint256","name":"amount0","type":"uint256"},{"internalType":"uint256","name":"amount1","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"claimFees","outputs":[{"internalType":"uint256","name":"claimed0","type":"uint256"},{"internalType":"uint256","name":"claimed1","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"claimStakingFees","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"claimable0","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"claimable1","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"tokenIn","type":"address"},{"internalType":"uint256","name":"amountIn","type":"uint256"}],"name":"current","outputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"currentCumulativePrices","outputs":[{"internalType":"uint256","name":"reserve0Cumulative","type":"uint256"},{"internalType":"uint256","name":"reserve1Cumulative","type":"uint256"},{"internalType":"uint256","name":"blockTimestamp","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"fees","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"address","name":"tokenIn","type":"address"}],"name":"getAmountOut","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getReserves","outputs":[{"internalType":"uint256","name":"_reserve0","type":"uint256"},{"internalType":"uint256","name":"_reserve1","type":"uint256"},{"internalType":"uint256","name":"_blockTimestampLast","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"index0","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"index1","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isStable","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastObservation","outputs":[{"components":[{"internalType":"uint256","name":"timestamp","type":"uint256"},{"internalType":"uint256","name":"reserve0Cumulative","type":"uint256"},{"internalType":"uint256","name":"reserve1Cumulative","type":"uint256"}],"internalType":"struct Pair.Observation","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"metadata","outputs":[{"internalType":"uint256","name":"dec0","type":"uint256"},{"internalType":"uint256","name":"dec1","type":"uint256"},{"internalType":"uint256","name":"r0","type":"uint256"},{"internalType":"uint256","name":"r1","type":"uint256"},{"internalType":"bool","name":"st","type":"bool"},{"internalType":"address","name":"t0","type":"address"},{"internalType":"address","name":"t1","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"mint","outputs":[{"internalType":"uint256","name":"liquidity","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"nonces","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"observationLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"observations","outputs":[{"internalType":"uint256","name":"timestamp","type":"uint256"},{"internalType":"uint256","name":"reserve0Cumulative","type":"uint256"},{"internalType":"uint256","name":"reserve1Cumulative","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"permit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"tokenIn","type":"address"},{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"points","type":"uint256"}],"name":"prices","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"tokenIn","type":"address"},{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"granularity","type":"uint256"}],"name":"quote","outputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"reserve0","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"reserve0CumulativeLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"reserve1","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"reserve1CumulativeLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"tokenIn","type":"address"},{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"points","type":"uint256"},{"internalType":"uint256","name":"window","type":"uint256"}],"name":"sample","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"skim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"stable","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"supplyIndex0","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"supplyIndex1","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount0Out","type":"uint256"},{"internalType":"uint256","name":"amount1Out","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"swap","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"sync","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"token0","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"token1","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tokens","outputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"src","type":"address"},{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}]

MGRABI = [{"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "user","type": "address"},{"indexed": false,"internalType": "uint256","name": "nft","type": "uint256"},{"indexed": false,"internalType": "uint256","name": "veAmount","type": "uint256"},{"indexed": false,"internalType": "uint256","name": "shares","type": "uint256"},{"indexed": false,"internalType": "uint256","name": "wen","type": "uint256"}],"name": "Deposit","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "user","type": "address"},{"indexed": false,"internalType": "uint256","name": "nft","type": "uint256"}],"name": "Reclaim","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "user","type": "address"},{"indexed": false,"internalType": "uint256","name": "nft","type": "uint256"},{"indexed": false,"internalType": "uint256","name": "veAmount","type": "uint256"},{"indexed": false,"internalType": "uint256","name": "shares","type": "uint256"},{"indexed": false,"internalType": "uint256","name": "wen","type": "uint256"}],"name": "Withdraw","type": "event"},{"inputs": [],"name": "ELTOKEN","outputs": [{"internalType": "contract IERC20","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "ID","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "REBASE","outputs": [{"internalType": "contract IRebase","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "REDEMPTIONS","outputs": [{"internalType": "contract IRedemptions","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "VENFT","outputs": [{"internalType": "contract IVotingEscrow","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "VOTER","outputs": [{"internalType": "contract IVoter","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "claimRebase","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "dao","outputs": [{"internalType": "address","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "_id","type": "uint256"}],"name": "deposit","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "feesToBurn","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "feesToDao","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "floor","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "_user","type": "address"},{"internalType": "address","name": "_farm","type": "address"}],"name": "getAllowance","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "_contract","type": "address"}],"name": "getApr","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "getCurrentEpoch","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "getCurrentVote","outputs": [{"internalType": "uint256","name": "_id","type": "uint256"},{"internalType": "uint256","name": "_wen","type": "uint256"},{"internalType": "address[]","name": "_pools","type": "address[]"},{"internalType": "uint256[]","name": "_wt","type": "uint256[]"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "_contract","type": "address"}],"name": "getTvl","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "_user","type": "address"},{"internalType": "address[]","name": "_farms","type": "address[]"},{"internalType": "address[]","name": "_pricing","type": "address[]"}],"name": "info","outputs": [{"internalType": "uint256[]","name": "","type": "uint256[]"},{"internalType": "address[]","name": "","type": "address[]"},{"internalType": "uint256[]","name": "","type": "uint256[]"},{"internalType": "uint256[]","name": "","type": "uint256[]"},{"internalType": "uint256[]","name": "","type": "uint256[]"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "_vo","type": "address"},{"internalType": "address","name": "_el","type": "address"},{"internalType": "uint256","name": "_id","type": "uint256"}],"name": "initialize","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "","type": "address"},{"internalType": "address","name": "","type": "address"},{"internalType": "uint256","name": "","type": "uint256"},{"internalType": "bytes","name": "","type": "bytes"}],"name": "onERC721Received","outputs": [{"internalType": "bytes4","name": "","type": "bytes4"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "paused","outputs": [{"internalType": "bool","name": "","type": "bool"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "","type": "address"},{"internalType": "uint256","name": "","type": "uint256"}],"name": "pendingRedemptions","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "price","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "publicPanic","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "uint256","name": "_id","type": "uint256"}],"name": "quote","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "_inc","type": "uint256"}],"name": "rawQuote","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "reclaim","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "_t","type": "address"},{"internalType": "uint256","name": "_a","type": "uint256"}],"name": "rescue","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "d","type": "address"}],"name": "setDAO","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "uint256","name": "_d","type": "uint256"},{"internalType": "uint256","name": "_b","type": "uint256"}],"name": "setFees","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "uint256","name": "_f","type": "uint256"}],"name": "setFloor","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "uint256","name": "_id","type": "uint256"}],"name": "setID","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "bool","name": "_p","type": "bool"}],"name": "setPaused","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "contract IRebase","name": "_r","type": "address"}],"name": "setRebase","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "contract IRedemptions","name": "_r","type": "address"}],"name": "setRedemptions","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "_m","type": "address"},{"internalType": "bool","name": "_b","type": "bool"}],"name": "setVoteManager","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address[]","name": "_p","type": "address[]"},{"internalType": "uint256[]","name": "_w","type": "uint256[]"}],"name": "vote","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "uint256","name": "_mi","type": "uint256"}],"name": "voteFrom","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "","type": "address"}],"name": "voteManager","outputs": [{"internalType": "bool","name": "","type": "bool"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "voteReset","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "uint256","name": "","type": "uint256"},{"internalType": "uint256","name": "","type": "uint256"}],"name": "votedPools","outputs": [{"internalType": "address","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "votedTime","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "","type": "uint256"},{"internalType": "uint256","name": "","type": "uint256"}],"name": "votedWeights","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "_tamt","type": "uint256"}],"name": "withdraw","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "nonpayable","type": "function"}];

function arf(){
	var xfr = setInterval(function() {
		console.log("refreshing farm stats", new Date() );
		try { if( ethers.utils.isAddress(window.ethereum.selectedAddress) ) {gubs();} }
		catch(e) { console.log('hmm..'); }
	}, 15000);
}

async function gubs() {
	lp = new ethers.Contract(WRAP, LPABI, signer);
	fa = new ethers.Contract(FARM, FARABI, signer);
	//fa_o = new ethers.Contract(FARMOLD, FARABI, signer);
	bal = await Promise.all([
		lp.balanceOf(window.ethereum.selectedAddress),
		fa.balanceOf(window.ethereum.selectedAddress),
		fa.earned(window.ethereum.selectedAddress,TEARNED[0]),
		fa.earnings(window.ethereum.selectedAddress,TEARNED[0]),
		fa.tvl(),
		fa.aprs(),
		//fa_o.balanceOf(window.ethereum.selectedAddress)
	]);
	$("bal_lp").innerHTML = (bal[0]/1e18).toFixed(8);
	$("bal_fa").innerHTML = (bal[1]/1e18).toFixed(8);
	$("bal_r0").innerHTML = (bal[2]/1e18).toFixed(8);
	$("bal_tr0").innerHTML = (bal[3]/1e18).toFixed(8);
	$("bal_tvl").innerHTML = fornum5(bal[4],18,2);
	$("bal_apr").innerHTML = fornum5(bal[5][0],18,2);

	//if(Number(bal[6]) > 0) { promptRedeposit(); }
}

async function pre_stats() {
	prepro = new ethers.providers.JsonRpcProvider(RPC_URL)
	lp = new ethers.Contract(WRAP, LPABI, prepro);
	fa = new ethers.Contract(FARM, FARABI, prepro);
	vm = new ethers.Contract(VENAMM,VMABI, prepro);
	//$("mintrate").innerHTML = ((await vm.price() )/1e18).toFixed(4);
	_p100 = fetch("https://api.odos.xyz/sor/quote/v2", {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				chainId: 56,
				inputTokens: [ { tokenAddress: WRAP, amount: BigInt(100e18).toString() } ],
				outputTokens: [ { tokenAddress: TOKEN, proportion: 1 } ],
				userAddr: '0x167D87A906dA361A10061fe42bbe89451c2EE584',
				slippageLimitPercent: 0.3,
				referralCode: 0,
				compact: true,
			}),
		})

	MGR = new ethers.Contract(MANAGER, MGRABI, prepro);
	_mi = await MGR.info(ZERO_ADDR,[FARM],[]);

	/*

		for(uint i; i < _farms.length * 5; i += 5) {
			IGuruFarmland _farm = IGuruFarmland(_farms[i/5]);
			_farm_info[i  ] = _farm.balanceOf(_user);
			_farm_info[i+1] = _farm.totalSupply();
			_farm_info[i+2] = getTvl(_farms[i/5]);//_farm.tvlDeposits();
			_farm_info[i+3] = getApr(_farms[i/5]);//_farm.apr();
			_farm_info[i+4] = getAllowance(_user, _farms[i/5]);
		}
	*/

	//$("mintrate").innerHTML = fornum5(bal[2],18,2);
	//$("mintrate").innerHTML = fornum5(bal[2],18,8);
	// we need backing ratio, not mint rate
	backing_ratio = Number(_mi[0][7]) * 1e18 / Number(_mi[0][1]);
	$("mintrate").innerHTML = fornum5( backing_ratio , 18 , 8 );



	/*
	bal = await Promise.all([
		fa.tvl(),
		fa.aprs(),
		vm.price(),
		_p100
	]);
	*/

	bal =  await Promise.all([
		_mi[3][2],
		[_mi[3][3]],
		backing_ratio,
		_p100
	]);

	$("bal_tvl").innerHTML = fornum5(bal[0],18,2);
	$("bal_apr").innerHTML = fornum5(bal[1][0],18,2);



	//rebase apr
	wks = Math.floor(( Date.now() - REBASE_1) / (86400e3 * 7)) ;
	//rwr = (bal[2]/1e18 - 1) / wks;
	//rbapr = (1+rwr)**52 * 100;
	rwr = (bal[2]/1e18)**(1/wks);
	rb_apy = (rwr**52-1) * 100;
	$("bal_reb_apy").innerHTML = fornum5(rb_apy, 0, 2);

	bal[3] = await bal[3].json();
	bal[3] = Number(bal[3].outAmounts[0])
	relativePrice = bal[3] / 100e18;
	relp_rate = (relativePrice)**(1/wks);
	relp_apy = (relp_rate**52-1) * 100;
	///$("bal_relp_apy").innerHTML = `${relp_apy>0?"+":""}${fornum5(relp_apy, 0, 2)}`;

	///$("bal_tot_apr").innerHTML = fornum5(relp_apy + bal[1][0]/1e18, 0, 2);
	$("bal_tot_apr").innerHTML = fornum5(rb_apy + bal[1][0]/1e18, 0, 2);
	//console.log("bal t/a: ", fornum(bal[0],18), fornum(bal[1][0],18) )
}

async function deposit(ismax) {
	lp = new ethers.Contract(WRAP, LPABI, signer);
	fa = new ethers.Contract(FARM, FARABI, signer);
	al = await Promise.all([
		lp.allowance(window.ethereum.selectedAddress, FARM),
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
		let _tr = await lp.approve(FARM,ethers.constants.MaxUint256);
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
		<h3>Staking ${WRAPNAME}</h3>
		<img style='height:20px;position:relative;top:4px' src="${WRAPLOGO}">
		<u>${ fornum(amt,18).toLocaleString() } ${WRAPNAME}</u><br><br>
		<h4><u><i>Please Confirm this transaction in your wallet!</i></u></h4>
	`);
	let _tr = await fa.stake(amt);
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
		<br>Amount Staked:<br>
		<img style='height:20px;position:relative;top:4px' src="${WRAPLOGO}">
		<u>${ fornum(amt,18).toLocaleString() } ${WRAPNAME}</u><br><br>
		<h4><a target="_blank" href="${EXPLORE}/tx/${_tr.hash}">View on Explorer</a></h4>
	`);
}

async function withdraw(ismax) {
	lp = new ethers.Contract(WRAP, LPABI, signer);
	fa = new ethers.Contract(FARM, FARABI, signer);
	al = await Promise.all([
		fa.balanceOf(window.ethereum.selectedAddress)
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
	let _tr = await fa.withdraw(amt);
	console.log(_tr);
	notice(`
		<h3>Unstaking ${WRAPNAME}!</h3>
		We hope you are enjoying your ${TEARNSYM.join(" + ")} rewards!<br>
		<h4><a target="_blank" href="${EXPLORE}/tx/${_tr.hash}">View on Explorer</a></h4>
	`);
	_tw = await _tr.wait()
	console.log(_tw)
	notice(`
		<h3>eTHENA Received!</h3>
		<br>Amount Unstaked:<br>
		<img style='height:20px;position:relative;top:4px' src="${WRAPLOGO}">
		<u>${ fornum(amt,18).toLocaleString() } ${WRAPNAME}</u><br><br>
		<h4><a target="_blank" href="${EXPLORE}/tx/${_tr.hash}">View on Explorer</a></h4>
	`);
}

prompted=false;

async function promptRedeposit() {
	if (prompted == false) {
		notice(`We have found an issue with claiming ${TEARNSYM.join(" + ")} rewards.<br><br><button onclick='withdrawOld()'>Withdraw All</button><br><br>We request you to withdraw once & redeposit again. Inconvenience is deeply regretted 🙏. <br><br>`);
	}
}

async function withdrawOld() {
	fa_o = new ethers.Contract(FARMOLD, FARABI, signer);
	prompted = true;
	notice(`
		<h3>Withdrawing Old ${WRAPNAME} Deposit</h3>
		<img style='height:20px;position:relative;top:4px' src="${WRAPLOGO}"> eTHENA will be sent back to your wallet..
		<h4><u><i>Please Confirm this transaction in your wallet!</i></u></h4>
	`);

	let _tr = await fa_o.withdrawAll();
	console.log(_tr);
	notice(`
		<h3>Unstaking Old ${WRAPNAME}!</h3>
		Please wait till the transaction is completed on chain.<br>
		<h4><a target="_blank" href="${EXPLORE}/tx/${_tr.hash}">View on Explorer</a></h4>
	`);
	_tw = await _tr.wait()
	console.log(_tw)
	notice(`
		<h3>eTHENA Received!</h3>
		<br>Please refresh the page & re-deposit again.
		<br>We are extremely sorry and sincerely apologize for the inconvenience caused.
		<h4><a target="_blank" href="${EXPLORE}/tx/${_tr.hash}">View on Explorer</a></h4>
		<br><i>All unclaimed rewards plus 0.01 BNB to cover gas costs will be airdropped to the depositors.</i>
	`);
}
async function claim() {
	fa = new ethers.Contract(FARM, FARABI, signer);
	notice(`
		<h3>Claiming Rewards!</h3>
		<img style='height:20px;position:relative;top:4px' src="${TEARNIMG[0]}">
		<u>${ $("bal_r0").innerHTML } ${TEARNSYM.join(" + ")}</u><br><br>
		<h4><u><i>Please Confirm this transaction in your wallet!</i></u></h4>
	`);
	let _tr = await fa.getReward(TEARNED[0]);
	console.log(_tr);
	notice(`
		<h3>Rewards are on their way!</h3>
		<img style='height:20px;position:relative;top:4px' src="${TEARNIMG[0]}">
		<u>${ $("bal_r0").innerHTML } ${TEARNSYM.join(" + ")}</u><br><br>
		We hope you enjoy staking with us!<br>
		<h4><a target="_blank" href="${EXPLORE}/tx/${_tr.hash}">View on Explorer</a></h4>
	`);
	_tw = await _tr.wait()
	console.log(_tw)
	notice(`
		<h3>Rewards Credited!</h3>
		<br><br>
		<img style='height:20px;position:relative;top:4px' src="${TEARNIMG[0]}">
		<u>${ $("bal_r0").innerHTML } ${TEARNSYM.join(" + ")}</u><br><br>
		<h4><a target="_blank" href="${EXPLORE}/tx/${_tr.hash}">View on Explorer</a></h4>
	`);
}
function notice(c) {
	window.location = "#note";
	$("content1").innerHTML = c;
	console.log(c);
}

async function dexstats() {
	return;
}
async function extendRewards() {
	notice(`
		<h2>Donate Rewards</h2>
		Enter the amount of ${TEARNSYM[0]} you want to Donate as rewards to this Farmland. It will also extend the dry date by 8 days!<br><br>
		YOU WILL LOSE YOUR TOKENS! DONT DO THIS!!
		<br>
		<input id="extendRewardsInput" placeholder="Amount" class="light-in in-box"/>
		<br><br>
		<button onclick="notifyRewards()" class="equal-gradient">Add</button>
	`);
}
async function notifyRewards() {
	_amt = $('extendRewardsInput').value;
	_T = new ethers.Contract(TEARNED[0],LPABI,signer);
	_ab = await Promise.all([
		_T.balanceOf(window.ethereum.selectedAddress),
		_T.allowance(window.ethereum.selectedAddress,FARM)
	]);

	if(Number(_ab[0])/1e18 < _amt) { notice(`Insufficient Balance!`); return; }

	if(Number(_ab[1])/1e18 < _amt) {
		notice(`Insufficient Allowance!<br><br>Please allow the Farmland to spend ${_amt} tokens from your wallet!`);
		txh = await _T.approve(FARM, BigInt(Math.floor(_amt*1e18)) );//ethers.constants.MaxUint256
		notice(`Approving ${_amt} tokens..`);
		await txh.wait();
	}

	_F = new ethers.Contract(FARM,FARABI,signer);
	notice(`Approve the transaction in wallet..`);
	txh = await _F.notifyRewardAmount( TEARNED[0], BigInt(Math.floor(_amt*1e18)) );
	notice(`Adding Rewards..`);
	await txh.wait();
	notice(`<h2>Rewards added!</h2>`);


}