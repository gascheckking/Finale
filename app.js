let provider, signer, userAddress;

document.addEventListener('DOMContentLoaded', () => {
  const walletBtn = document.getElementById('connectWallet');
  const claimBtn = document.getElementById('claimXpBtn');
  const refreshBtn = document.getElementById('refreshTrack');
  const upgradeBtn = document.getElementById('upgradeBtn');
  const shareXBtn = document.getElementById('shareOnXBtn');
  const shareFarcasterBtn = document.getElementById('shareFarcasterBtn');

  document.querySelectorAll('.tab-button').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(tab => tab.style.display = 'none');
      btn.classList.add('active');
      document.querySelector(`.tab-content.${btn.dataset.tab}`).style.display = 'block';
    });
  });

  walletBtn.addEventListener('click', connectWallet);
  claimBtn.addEventListener('click', () => {
    document.getElementById('xpClaimFeedback').style.display = 'block';
    document.getElementById('totalXP').textContent = '5';
  });

  refreshBtn?.addEventListener('click', updateTrackTab);
  upgradeBtn?.addEventListener('click', () => {
    document.getElementById('premiumStatus').style.display = 'block';
    alert('You’re now Premium!');
  });

  shareXBtn?.addEventListener('click', () => {
    window.open(`https://twitter.com/intent/tweet?text=WarpAI rules! https://warp-ai.vercel.app/`, '_blank');
    document.getElementById('shareFeedback').style.display = 'block';
  });

  shareFarcasterBtn?.addEventListener('click', () => {
    window.open(`https://warpcast.com/~/compose?text=WarpAI rules! https://warp-ai.vercel.app/`, '_blank');
    document.getElementById('shareFeedback').style.display = 'block';
  });
});

async function connectWallet() {
  try {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    signer = provider.getSigner();
    userAddress = await signer.getAddress();
    document.getElementById('walletAddress').textContent = `${userAddress.slice(0, 6)}...${userAddress.slice(-4)}`;
    updateTrackTab();
    updateAirdrop();
  } catch (e) {
    alert('Wallet connection failed.');
  }
}

async function updateTrackTab() {
  const readProvider = new ethers.providers.AlchemyProvider("base", "aH4-X2bNp1BarPcBcHiWR6vHxJz_lGbA");
  const txCount = await readProvider.getTransactionCount(userAddress);
  document.getElementById('txCount').textContent = txCount;
  document.getElementById('gasSpent').textContent = '$0 (mocked)';
}

async function updateAirdrop() {
  const chance = Math.min(100, Math.floor(Math.random() * 100));
  document.getElementById('airdropChance').textContent = `${chance}%`;
}
