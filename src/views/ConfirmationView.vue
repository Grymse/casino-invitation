<template>
  <div class="confirmation-page">
    <div class="overlay"></div>
    <div class="content">
      <div class="logo-container">
        <div class="approved-stamp">GODKENDT</div>
        <h1>AMAGER CASINO</h1>
        <p class="subtitle">MAKE THAT MONEY</p>
        <div class="poker-chips">
          <div class="chip chip-red"></div>
          <div class="chip chip-black"></div>
          <div class="chip chip-gold"></div>
        </div>
      </div>

      <div class="confirmation-container">
        <div class="success-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path
              d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"
              fill="#d4af37"
            />
          </svg>
        </div>

        <h2>TAK FOR DIN TILMELDING</h2>

        <p class="message">
          Din anmodning om adgang til vores eksklusive casino-arrangement er modtaget.
          <span v-if="registeredPhone"
            >Vi sender information til <strong>{{ registeredPhone }}</strong> hvor du vil</span
          >
          <span v-else>Af sikkerhedsmæssige årsager vil du</span> modtage en SMS med den præcise
          lokation få dage inden arrangementet.
        </p>

        <div class="reminder-box">
          <h3>HUSK</h3>
          <ul>
            <li>At arrangementet finder sted den <strong>13. juni 2025 kl. 19:00</strong></li>
            <li>At dresscode er fint tøj (ingen adgang i afslappet påklædning)</li>
            <li>At medbringe dine egne drikkevarer</li>
            <li>Din buy-in på <strong>50 DKK</strong> (Vi tager MobilePay (Burner nummer))</li>
            <li>At holde arrangementet hemmeligt - vi opererer under myndighedernes radar!</li>
          </ul>
        </div>

        <div class="calendar-section">
          <h3>TILFØJ TIL DIN KALENDER</h3>
          <button class="calendar-button" @click="addToCalendar">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              width="16"
              height="16"
              style="margin-right: 8px"
            >
              <path
                d="M128 0c17.7 0 32 14.3 32 32V64H288V32c0-17.7 14.3-32 32-32s32 14.3 32 32V64h48c26.5 0 48 21.5 48 48v48H0V112C0 85.5 21.5 64 48 64H96V32c0-17.7 14.3-32 32-32zM0 192H448V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V192zm64 80v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm128 0v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H208c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H336z"
                fill="currentColor"
              />
            </svg>
            Tilføj til kalender
          </button>
        </div>

        <div class="warning-note">
          <div class="caution-tape"></div>
          <p>
            <strong>STRENG FORTROLIGHED:</strong> Dette arrangement opererer under myndighedernes
            radar. Del ingen information med udenforstående. Medbring ikke elektroniske enheder der
            kan spore din lokation.
          </p>
          <p>
            <strong>SIKKERHEDSPROTOKOL:</strong> Hvis du bliver stoppet af myndighederne, benægt alt
            kendskab til dette arrangement. Vis ikke denne invitation til andre.
          </p>
          <p class="final-message">
            Vi glæder os til at se dig og byder dig velkommen til en aften med spænding, held og
            muligheden for at vinde <span class="gold-text">millioner!</span>
          </p>
        </div>

        <div class="back-link">
          <a href="/" @click.prevent="goBack"> &larr; Tilbage til forsiden </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'

const router = useRouter()
const registeredPhone = ref('')

onMounted(() => {
  // Check if user came here from registration
  const registered = localStorage.getItem('casinoRegistered')
  const phone = localStorage.getItem('casinoPhone')

  // If they haven't registered, redirect them back to registration
  if (!registered) {
    router.push('/')
    return
  }

  if (phone) {
    registeredPhone.value = phone
  }
})

const goBack = () => {
  router.push('/')
}

const addToCalendar = () => {
  // Create calendar event details
  const title = 'Royal Flush Underground Casino'
  const startDate = '2025-06-13T19:00:00'
  const endDate = '2025-06-13T23:59:00'
  const location = 'Amagerbro (Præcis lokation sendes på SMS)'
  const description =
    'Eksklusivt casino-arrangement. Dresscode: Fin påklædning. ' +
    'Medbring egne drikkevarer. Buy-in: 50 DKK. Hold arrangementet hemmeligt!'

  // Generate Google Calendar URL
  const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${encodeURIComponent(startDate.replace(/[-:]/g, ''))}/${encodeURIComponent(endDate.replace(/[-:]/g, ''))}&details=${encodeURIComponent(description)}&location=${encodeURIComponent(location)}&sf=true&output=xml`

  // Open in new tab
  window.open(googleCalendarUrl, '_blank')
}
</script>

<style>
.confirmation-page {
  min-height: 100vh;
  position: relative;
  font-family: 'Playfair Display', serif;
  color: #ffffff;
  background-size: cover;
  background-position: center;
  padding: 0;
  margin: 0;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  z-index: 1;
}

.content {
  position: relative;
  z-index: 2;
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
}

.logo-container {
  text-align: center;
  margin-bottom: 40px;
  padding: 20px;
  border: 2px solid #d4af37;
}

h1 {
  font-size: 3.5rem;
  margin: 0;
  color: #d4af37;
  letter-spacing: 6px;
  font-weight: bold;
}

.subtitle {
  font-size: 1.2rem;
  margin: 5px 0 10px;
  letter-spacing: 3px;
}

.approved-stamp {
  position: absolute;
  top: -10px;
  right: -10px;
  background-color: #115740;
  color: white;
  padding: 5px 15px;
  transform: rotate(15deg);
  font-size: 0.9rem;
  font-weight: bold;
  letter-spacing: 1px;
  border: 2px solid #d4af37;
  box-shadow: 0 0 10px rgba(212, 175, 55, 0.5);
}

.poker-chips {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 15px;
}

.chip {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  position: relative;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

.chip::before {
  content: '';
  position: absolute;
  top: 5px;
  left: 5px;
  right: 5px;
  bottom: 5px;
  border-radius: 50%;
  border: 2px dashed rgba(255, 255, 255, 0.3);
}

.chip-red {
  background: #b22222;
  border: 4px dashed #d4af37;
  transform: rotate(-10deg);
}

.chip-black {
  background: #1b1b1b;
  border: 4px dashed #d4af37;
}

.chip-gold {
  background: #d4af37;
  border: 4px dashed #1b1b1b;
  transform: rotate(10deg);
}

.confirmation-container {
  background: rgba(21, 40, 30, 0.85);
  padding: 30px;
  border: 1px solid #d4af37;
  box-shadow: 0 0 20px rgba(212, 175, 55, 0.3);
  text-align: center;
}

.success-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 20px;
}

h2 {
  color: #d4af37;
  margin-bottom: 20px;
  font-size: 2rem;
  border-bottom: 1px solid #d4af37;
  padding-bottom: 10px;
}

.message {
  font-size: 1.2rem;
  margin-bottom: 30px;
  line-height: 1.6;
}

.reminder-box {
  background: rgba(0, 0, 0, 0.4);
  padding: 20px;
  margin: 30px 0;
  border-left: 3px solid #d4af37;
  text-align: left;
}

h3 {
  color: #d4af37;
  margin-bottom: 15px;
  font-size: 1.4rem;
}

ul {
  padding-left: 20px;
  line-height: 1.8;
}

.calendar-section {
  margin: 30px 0;
}

.calendar-button {
  background: #d4af37;
  color: #0e1c17;
  border: none;
  padding: 12px 25px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
}

.calendar-button:hover {
  background: #b7953a;
}

.warning-note {
  margin-top: 30px;
  padding: 20px;
  border-top: 1px solid rgba(212, 175, 55, 0.3);
  font-style: italic;
  position: relative;
}

.caution-tape {
  position: absolute;
  top: -10px;
  left: 0;
  right: 0;
  background: repeating-linear-gradient(45deg, #b22222, #b22222 10px, #000 10px, #000 20px);
  color: white;
  padding: 3px 0;
  font-size: 0.7rem;
  text-align: center;
  font-weight: bold;
  letter-spacing: 1px;
  white-space: nowrap;
  overflow: hidden;
}

.final-message {
  margin-top: 20px;
  color: #d4af37;
  font-weight: bold;
}

.gold-text {
  color: #d4af37;
  text-shadow: 0 0 5px rgba(212, 175, 55, 0.7);
  font-weight: bold;
}

.back-link {
  margin-top: 40px;
}

.back-link a {
  color: #d4af37;
  text-decoration: none;
  font-size: 1.1rem;
}

.back-link a:hover {
  text-decoration: underline;
}

@media (max-width: 600px) {
  h1 {
    font-size: 2.5rem;
  }

  .calendar-button {
    width: 100%;
  }
}
</style>
