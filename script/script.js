// IDs do usuário
const userId1 = '1288450714862882826';
const avatarElement1 = document.getElementById('avatar1');
const nicknameElement1 = document.getElementById('nickname-text1');
const subnickElement1 = document.getElementById('subnick1');
const nitroBadge1 = document.getElementById('nitro-badge1');
const boostBadge1 = document.getElementById('boost-badge1');
const viewsElement = document.getElementById('view-count');

// Função para buscar dados do usuário via Lanyard
async function fetchLanyardData(userId, avatarElement, nicknameElement, subnickElement, nitroBadge, boostBadge) {
  try {
    const response = await fetch(`https://api.lanyard.rest/v1/users/${userId}`);
    const data = await response.json();

    if (data.success) {
      const { discord_user, premium_type } = data.data;

      const nickname = discord_user.global_name || discord_user.username;
      nicknameElement.textContent = nickname;
      subnickElement.textContent = `@${discord_user.username}`;
      avatarElement.src = `https://cdn.discordapp.com/avatars/${userId}/${discord_user.avatar}.png?size=512`;

      if (premium_type === 2) {
        nitroBadge.classList.remove('hidden');
      }
      if (premium_type === 1) {
        boostBadge.classList.remove('hidden');
      }
    } else {
      nicknameElement.textContent = 'Usuário não encontrado';
      subnickElement.textContent = '';
    }
  } catch (error) {
    nicknameElement.textContent = 'Erro ao carregar';
    subnickElement.textContent = '';
  }
}

// Função para incrementar o contador de visualizações
async function incrementViews() {
  try {
    const response = await fetch('http://localhost:3000/views', { method: 'POST' });
    const data = await response.json();
    viewsElement.textContent = `Visualizações: ${data.views}`;
  } catch (error) {
    viewsElement.textContent = 'Erro ao carregar visualizações';
    console.error(error);
  }
}

// Inicializar
fetchLanyardData(userId1, avatarElement1, nicknameElement1, subnickElement1, nitroBadge1, boostBadge1);
incrementViews();