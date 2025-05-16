<template>
  <div class="casino-home">
    <div class="overlay"></div>
    <div class="content">
      <div class="logo-container">
        <div class="confidential-stamp">TOPHEMMELIGT</div>
        <h1>AMAGER CASINO</h1>
        <p class="subtitle">MAKE THAT MONEY</p>
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
    await addDoc(collection(db, 'phone-number'), {
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
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  padding: 0;
  margin: 0;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(10, 10, 10, 0.85));
  z-index: 1;
}

.content {
  position: relative;
  z-index: 2;
  max-width: 800px;
  margin: 0 auto;
  padding: 60px 20px;
}

.logo-container {
  text-align: center;
  margin-bottom: 50px;
  padding: 30px 20px;
  border: 1px solid var(--gold-primary);
  background-color: rgba(10, 10, 10, 0.75);
  box-shadow:
    0 10px 30px rgba(0, 0, 0, 0.3),
    0 0 20px rgba(212, 175, 55, 0.2);
  backdrop-filter: blur(4px);
  border-radius: 2px;
  position: relative;
}

h1 {
  font-size: 3.8rem;
  margin: 0;
  color: var(--gold-primary);
  letter-spacing: 8px;
  font-weight: 600;
  text-shadow: 0 2px 10px rgba(212, 175, 55, 0.5);
  position: relative;
  display: inline-block;
}

h1:after {
  content: '';
  position: absolute;
  width: 80px;
  height: 2px;
  background: var(--gold-light);
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
}

.subtitle {
  font-size: 1.3rem;
  margin: 20px 0 10px;
  letter-spacing: 5px;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 400;
}

.secret-label {
  display: inline-block;
  padding: 8px 18px;
  background-color: var(--burgundy);
  font-size: 0.9rem;
  letter-spacing: 3px;
  transform: rotate(-3deg);
  margin: 15px auto;
  border-radius: 1px;
  text-transform: uppercase;
  box-shadow: 0 4px 12px rgba(128, 0, 32, 0.4);
}

.confidential-stamp {
  position: absolute;
  top: -12px;
  right: -12px;
  background-color: var(--burgundy);
  color: white;
  padding: 8px 18px;
  transform: rotate(12deg);
  font-size: 0.8rem;
  font-weight: bold;
  letter-spacing: 1.5px;
  border: 1px dashed #ffffff;
  opacity: 0.95;
  animation: pulse 2s infinite;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
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
  gap: 25px;
  margin-top: 30px;
  perspective: 600px;
}

.dice {
  width: 42px;
  height: 42px;
  background: linear-gradient(135deg, #ffffff, #f0f0f0);
  border-radius: 6px;
  display: grid;
  grid-template: repeat(3, 1fr) / repeat(3, 1fr);
  padding: 5px;
  box-shadow:
    0 8px 16px rgba(0, 0, 0, 0.4),
    0 0 10px rgba(212, 175, 55, 0.6);
  position: relative;
  transition:
    transform 0.4s ease,
    box-shadow 0.4s ease;
}

.dice::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  z-index: 2;
}

.dice-1 {
  transform: rotate(-12deg) translateY(2px);
  animation: floatDice1 4s infinite ease-in-out;
}

.dice-6 {
  transform: rotate(12deg) translateY(-2px);
  animation: floatDice6 4.5s infinite ease-in-out;
}

@keyframes floatDice1 {
  0%,
  100% {
    transform: rotate(-10deg) translateY(0);
  }
  50% {
    transform: rotate(-14deg) translateY(-4px);
  }
}

@keyframes floatDice6 {
  0%,
  100% {
    transform: rotate(10deg) translateY(0);
  }
  50% {
    transform: rotate(14deg) translateY(4px);
  }
}

.dot {
  background-color: #0e1c17;
  border-radius: 50%;
  margin: 2px;
  box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.8);
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
  background: rgba(16, 30, 26, 0.8);
  padding: 40px;
  border: 1px solid var(--gold-primary);
  box-shadow:
    0 20px 40px rgba(0, 0, 0, 0.4),
    0 0 30px rgba(212, 175, 55, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 3px;
  position: relative;
  overflow: hidden;
}

.invitation-container:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: linear-gradient(
    to right,
    rgba(212, 175, 55, 0),
    var(--gold-primary),
    rgba(212, 175, 55, 0)
  );
}

h2 {
  text-align: center;
  color: var(--gold-primary);
  margin-bottom: 30px;
  font-size: 2.2rem;
  position: relative;
  padding-bottom: 15px;
  font-weight: 500;
}

h2:after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 1px;
  background: linear-gradient(
    to right,
    rgba(212, 175, 55, 0),
    var(--gold-primary),
    rgba(212, 175, 55, 0)
  );
}

.reopening {
  font-size: 1.15rem;
  margin-bottom: 30px;
  line-height: 1.8;
  text-align: center;
  font-style: italic;
  color: rgba(255, 255, 255, 0.9);
  letter-spacing: 0.3px;
}

.highlight {
  color: var(--gold-primary);
  font-weight: bold;
  font-size: 1.25rem;
  text-shadow: 0 0 8px rgba(212, 175, 55, 0.8);
  position: relative;
  display: inline-block;
}

.warning-text {
  display: flex;
  align-items: center;
  font-size: 0.95rem;
  background-color: rgba(128, 0, 32, 0.15);
  border: 1px solid rgba(128, 0, 32, 0.3);
  border-radius: 3px;
  padding: 16px 20px;
  margin: 35px 0;
  color: rgba(255, 153, 153, 0.95);
  position: relative;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(4px);
  line-height: 1.7;
  letter-spacing: 0.3px;
}

.warning-text:before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 4px;
  height: 100%;
  background: var(--burgundy);
}

.warning-icon {
  width: 22px;
  height: 22px;
  margin-right: 15px;
  flex-shrink: 0;
  color: var(--burgundy-light);
}

.details {
  margin: 40px 0;
  background: rgba(10, 10, 10, 0.5);
  padding: 30px;
  border-left: 2px solid var(--gold-primary);
  border-radius: 0 3px 3px 0;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.detail-item {
  margin-bottom: 22px;
  position: relative;
  padding-left: 15px;
}

.detail-item:last-child {
  margin-bottom: 0;
}

.detail-item:before {
  content: '';
  position: absolute;
  left: 0;
  top: 8px;
  width: 5px;
  height: 5px;
  background: var(--gold-primary);
  border-radius: 50%;
}

.detail-label {
  color: var(--gold-primary);
  font-weight: 500;
  display: block;
  margin-bottom: 6px;
  letter-spacing: 0.5px;
  font-size: 1.05rem;
}

.detail-value {
  display: block;
  padding-left: 5px;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.7;
}

.registration-form {
  margin-top: 50px;
  border-top: 1px solid rgba(212, 175, 55, 0.2);
  padding-top: 40px;
  text-align: center;
  position: relative;
}

.registration-form:before {
  content: '★';
  color: var(--gold-primary);
  font-size: 1.2rem;
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(16, 30, 26, 0.8);
  padding: 0 20px;
}

h3 {
  color: var(--gold-primary);
  margin-bottom: 20px;
  font-size: 1.5rem;
  font-weight: 500;
  letter-spacing: 0.5px;
}

.warning {
  color: rgba(255, 153, 153, 0.9);
  font-size: 0.95rem;
  margin-bottom: 25px;
  font-style: italic;
  max-width: 550px;
  margin-left: auto;
  margin-right: auto;
}

.input-group {
  display: flex;
  margin-bottom: 18px;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
}

input {
  flex: 1;
  padding: 16px 20px;
  border: 1px solid rgba(212, 175, 55, 0.4);
  background: rgba(0, 0, 0, 0.7);
  color: white;
  font-size: 1.05rem;
  letter-spacing: 0.5px;
  font-family: 'Cormorant Garamond', serif;
  transition: all 0.3s ease;
}

input:focus {
  border-color: var(--gold-primary);
  box-shadow: 0 0 0 2px rgba(212, 175, 55, 0.1);
  outline: none;
}

input.error {
  border-color: var(--burgundy);
  box-shadow: 0 0 0 1px rgba(128, 0, 32, 0.2);
}

button {
  background: var(--gold-primary);
  color: #0a0a0a;
  border: none;
  padding: 0 28px;
  cursor: pointer;
  font-weight: 500;
  letter-spacing: 0.8px;
  transition: all 0.3s ease;
  text-transform: uppercase;
  font-size: 0.9rem;
  position: relative;
  overflow: hidden;
}

button:before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.2);
  transition: all 0.5s ease;
  transform: skewX(-15deg);
}

button:hover {
  background: var(--gold-light);
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
}

button:hover:before {
  left: 100%;
}

button:disabled {
  background: rgba(212, 175, 55, 0.5);
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.error-message {
  color: rgba(255, 102, 102, 0.9);
  font-size: 0.9rem;
  margin-bottom: 20px;
  text-align: left;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 10px;
}

.disclaimer {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.6);
  margin-top: 25px;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .content {
    padding: 40px 16px;
  }

  .invitation-container {
    padding: 30px 20px;
  }

  h1 {
    font-size: 2.8rem;
    letter-spacing: 5px;
  }

  h2 {
    font-size: 1.8rem;
  }

  .subtitle {
    font-size: 1.1rem;
    letter-spacing: 3px;
  }

  .details {
    padding: 25px 20px;
  }
}

@media (max-width: 600px) {
  .input-group {
    flex-direction: column;
  }

  input,
  button {
    width: 100%;
  }

  input {
    margin-bottom: 12px;
    border-radius: 3px;
  }

  button {
    border-radius: 3px;
    padding: 14px;
  }

  h1 {
    font-size: 2.3rem;
    letter-spacing: 4px;
  }

  h1:after {
    width: 60px;
  }

  .logo-container {
    padding: 25px 15px;
  }

  .confidential-stamp {
    font-size: 0.7rem;
    padding: 6px 12px;
  }

  .casino-dice {
    gap: 15px;
  }

  .dice {
    width: 36px;
    height: 36px;
  }

  .warning-text {
    padding: 14px 16px;
    font-size: 0.85rem;
  }
}
</style>
