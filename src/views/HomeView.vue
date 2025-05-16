<template>
  <div class="casino-home">
    <div class="overlay"></div>
    <div class="content">
      <div class="logo-container">
        <div class="confidential-stamp">TOPHEMMELIGT</div>
        <h1>ROYAL FLUSH</h1>
        <p class="subtitle">UNDERGROUND CASINO</p>
        <p class="secret-label">POLITIEFTERLYST</p>
        <div class="casino-dice">
          <div class="dice dice-1">
            <span class="dot"></span>
          </div>
          <div class="dice dice-6">
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
          </div>
        </div>
      </div>

      <div class="invitation-container">
        <h2>EKSKLUSIV INVITATION</h2>
        <p class="reopening">
          Efter en uheldig razzia fra myndighederne åbner vi igen i det skjulte. En højprofileret
          gæst vandt så mange millioner på en enkelt aften, at politiet fik mistanke. Nu fortsætter
          vi under jorden, væk fra myndighedernes søgelys, og inviterer til en eksklusiv aften fyldt
          med spænding, luksus og muligheden for at vinde <span class="highlight">millioner!</span>
        </p>
        <p class="warning-text">
          <svg class="warning-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path
              fill="currentColor"
              d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c-13.3 0-24 10.7-24 24v112c0 13.3 10.7 24 24 24s24-10.7 24-24V152c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0-64 0 32 32 0 1 0 64 0z"
            />
          </svg>
          Denne invitation skal holdes hemmelig! Del den ikke med udenforstående eller på sociale
          medier.
        </p>

        <div class="details">
          <div class="detail-item">
            <span class="detail-label">Sted:</span>
            <span class="detail-value">Amagerbro (Præcis lokation sendes på dato)</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Dato:</span>
            <span class="detail-value">13/6 2025</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Tidspunkt:</span>
            <span class="detail-value">19:00</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Dresscode:</span>
            <span class="detail-value">Det skal være fint.</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Alkohol:</span>
            <span class="detail-value"
              >Givet omstændighederne, er det ikke muligt for os at køre en bar, derfor bedes i tage
              fin alkohol med til eget forbrug (Og lidt mere)</span
            >
          </div>
          <div class="detail-item">
            <span class="detail-label">Buy-in:</span>
            <span class="detail-value">50 DKK</span>
          </div>
        </div>

        <div class="registration-form">
          <h3>Registrer dig for at modtage hemmelig lokation</h3>
          <p class="warning">
            Af sikkerhedsmæssige årsager kan vi kun afsløre den hemmelige lokation til et begrænset
            antal deltagere
          </p>
          <div class="input-group">
            <input
              type="text"
              v-model="phoneNumber"
              placeholder="+45 xx xx xx xx"
              :class="{ error: showError }"
            />
            <button @click="register" :disabled="isRegistering">
              {{ isRegistering ? 'Sender...' : 'Tilmeld dig' }}
            </button>
          </div>
          <div v-if="showError" class="error-message">
            Indtast venligst et gyldigt dansk telefonnummer
          </div>
          <p class="disclaimer">
            Ved at registrere dig bekræfter du, at du er over 18 år og accepterer risikoen ved at
            deltage i dette eksklusive arrangement
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../firebase'

const router = useRouter()
const phoneNumber = ref('')
const showError = ref(false)
const isRegistering = ref(false)

const validateDanishPhoneNumber = (phone: string) => {
  // Allow some flexibility in format as long as it has country code and 8 digits
  const regex = /^(?:\+45[\s-]?)?\d{2}[\s-]?\d{2}[\s-]?\d{2}[\s-]?\d{2}$/
  return regex.test(phone)
}

const register = async () => {
  // Validate phone number
  if (!validateDanishPhoneNumber(phoneNumber.value)) {
    showError.value = true
    return
  }

  try {
    isRegistering.value = true
    showError.value = false

    const params = new URLSearchParams(window.location.search)
    const source = params.get('g') || 'unknown'

    // Save to Firebase
    await addDoc(collection(db, 'phone-numbers'), {
      phoneNumber: phoneNumber.value,
      timestamp: new Date(),
      source: source,
      status: 'pending',
    })

    // Store in localStorage to remember this user registered
    localStorage.setItem('casinoRegistered', 'true')
    localStorage.setItem('casinoPhone', phoneNumber.value)

    // Navigate to confirmation page
    router.push('/confirmation')
  } catch (error) {
    console.error('Error registering:', error)
    alert('Der opstod en fejl. Prøv venligst igen.')
  } finally {
    isRegistering.value = false
  }
}
</script>

<style>
.casino-home {
  min-height: 100vh;
  position: relative;
  font-family: 'Playfair Display', serif;
  color: #ffffff;
  background-image: url('/casino-background.svg');
  background-size: cover;
  background-position: center;
  padding: 0;
  margin: 0;
  margin-top: 40px;
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

.secret-label {
  display: inline-block;
  padding: 5px 15px;
  background-color: #b22222;
  font-size: 0.9rem;
  letter-spacing: 2px;
  transform: rotate(-5deg);
  margin: 10px auto;
}

.confidential-stamp {
  position: absolute;
  top: -15px;
  right: -15px;
  background-color: #b22222;
  color: white;
  padding: 5px 15px;
  transform: rotate(15deg);
  font-size: 0.8rem;
  font-weight: bold;
  letter-spacing: 1px;
  border: 2px dashed #ffffff;
  opacity: 0.9;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    opacity: 0.7;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.7;
  }
}

.casino-dice {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 15px;
}

.dice {
  width: 40px;
  height: 40px;
  background: #ffffff;
  border-radius: 5px;
  display: grid;
  grid-template: repeat(3, 1fr) / repeat(3, 1fr);
  padding: 5px;
  box-shadow: 0 0 10px rgba(212, 175, 55, 0.7);
}

.dice-1 {
  transform: rotate(-10deg);
}

.dice-6 {
  transform: rotate(10deg);
}

.dot {
  background-color: #0e1c17;
  border-radius: 50%;
  margin: 2px;
}

.dice-1 .dot {
  grid-column: 2;
  grid-row: 2;
}

.dice-6 .dot:nth-child(1) {
  grid-column: 1;
  grid-row: 1;
}
.dice-6 .dot:nth-child(2) {
  grid-column: 3;
  grid-row: 1;
}
.dice-6 .dot:nth-child(3) {
  grid-column: 1;
  grid-row: 2;
}
.dice-6 .dot:nth-child(4) {
  grid-column: 3;
  grid-row: 2;
}
.dice-6 .dot:nth-child(5) {
  grid-column: 1;
  grid-row: 3;
}
.dice-6 .dot:nth-child(6) {
  grid-column: 3;
  grid-row: 3;
}

.invitation-container {
  background: rgba(21, 40, 30, 0.85);
  padding: 30px;
  border: 1px solid #d4af37;
  box-shadow: 0 0 20px rgba(212, 175, 55, 0.3);
}

h2 {
  text-align: center;
  color: #d4af37;
  margin-bottom: 20px;
  font-size: 2rem;
  border-bottom: 1px solid #d4af37;
  padding-bottom: 10px;
}

.reopening {
  font-size: 1.1rem;
  margin-bottom: 20px;
  line-height: 1.6;
  text-align: center;
  font-style: italic;
}

.highlight {
  color: #d4af37;
  font-weight: bold;
  font-size: 1.2rem;
  text-shadow: 0 0 5px rgba(212, 175, 55, 0.7);
}

.warning-text {
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  background-color: rgba(178, 34, 34, 0.2);
  border-left: 3px solid #b22222;
  padding: 10px;
  margin-bottom: 30px;
  color: #ff9999;
}

.warning-icon {
  width: 20px;
  height: 20px;
  margin-right: 10px;
  flex-shrink: 0;
}

.details {
  margin: 30px 0;
  background: rgba(0, 0, 0, 0.4);
  padding: 20px;
  border-left: 3px solid #d4af37;
}

.detail-item {
  margin-bottom: 15px;
}

.detail-label {
  color: #d4af37;
  font-weight: bold;
  display: block;
  margin-bottom: 5px;
}

.detail-value {
  display: block;
  padding-left: 10px;
}

.registration-form {
  margin-top: 40px;
  border-top: 1px solid rgba(212, 175, 55, 0.3);
  padding-top: 30px;
  text-align: center;
}

h3 {
  color: #d4af37;
  margin-bottom: 15px;
  font-size: 1.4rem;
}

.warning {
  color: #ff9999;
  font-size: 0.9rem;
  margin-bottom: 20px;
  font-style: italic;
}

.input-group {
  display: flex;
  margin-bottom: 15px;
}

input {
  flex: 1;
  padding: 12px;
  border: 1px solid #d4af37;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  font-size: 1.1rem;
}

input.error {
  border-color: #b22222;
}

button {
  background: #d4af37;
  color: #0e1c17;
  border: none;
  padding: 0 25px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s;
}

button:hover {
  background: #b7953a;
}

button:disabled {
  background: #8c7229;
  cursor: not-allowed;
}

.error-message {
  color: #ff6666;
  font-size: 0.9rem;
  margin-bottom: 15px;
  text-align: left;
}

.disclaimer {
  font-size: 0.8rem;
  opacity: 0.7;
  margin-top: 20px;
}

@media (max-width: 600px) {
  .input-group {
    flex-direction: column;
  }

  input,
  button {
    width: 100%;
    margin-bottom: 10px;
  }

  h1 {
    font-size: 2.5rem;
  }
}
</style>
