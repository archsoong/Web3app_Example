import demiABI from "./demi_token.js"

document.addEventListener("DOMContentLoaded", () => {
  const web3 = new Web3(window.ethereum)

  document.getElementById("load_button").addEventListener("click", async () => {
    const contract = new web3.eth.Contract(demiABI, "0xa6916545A56f75ACD43fb6A1527A73a41d2b4081")
    const walletAddress = '0xEfE04Fbc962046Ea6C035FD60cbCf41C87E7a7B4'
    contract.defaultAccount = walletAddress
    const spacePunksBalance = await contract.methods.balanceOf(walletAddress).call()
    
    document.getElementById("nfts").innerHTML = ""

    for(let i = 0; i < spacePunksBalance; i++) {
      const tokenId = await contract.methods.tokenOfOwnerByIndex(walletAddress, i).call()

      let tokenMetadataURI = await contract.methods.tokenURI(tokenId).call()

      const tokenMetadata = await fetch(tokenMetadataURI).then((response) => response.json())

      console.log(tokenMetadata)

      const spacePunkTokenElement = document.getElementById("nft_template").content.cloneNode(true)
      spacePunkTokenElement.querySelector("h1").innerText = tokenMetadata["name"]
      console.log(tokenMetadata["image"])
      spacePunkTokenElement.querySelector("img").src = tokenMetadata["imageUrl"]
      spacePunkTokenElement.querySelector("img").alt = tokenMetadata["description"]

      document.getElementById("nfts").append(spacePunkTokenElement)
    }
  })
})