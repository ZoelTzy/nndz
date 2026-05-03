<template>
  <!-- Tombol bulat untuk membuka chat -->
  <button @click="isOpen = !isOpen" 
          class="fixed bottom-6 right-6 z-[100] w-14 h-14 bg-amber-200 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(253,230,138,0.5)] hover:scale-110 transition-transform">
    <span class="text-2xl">🤖</span>
  </button>

  <!-- Kotak Chat -->
  <div v-if="isOpen" class="fixed bottom-24 right-6 z-[100] w-80 sm:w-96 bg-[#121212] border border-[#383838] rounded-2xl shadow-2xl overflow-hidden flex flex-col fade-zoom-in">
    <!-- Header -->
    <div class="bg-amber-200 text-[#121212] px-4 py-3 font-bold text-sm flex justify-between items-center">
      <span>Tanya Asisten Nando</span>
      <button @click="isOpen = false" class="text-black hover:text-gray-700 text-lg">&times;</button>
    </div>

    <!-- Area Balasan -->
    <div class="h-80 p-4 overflow-y-auto flex flex-col gap-3 text-sm scrollbar-hide">
      <div v-for="(msg, index) in messages" :key="index" 
           :class="msg.sender === 'user' ? 'text-right' : 'text-left'">
        <span :class="msg.sender === 'user' ? 'bg-amber-200 text-black rounded-br-none' : 'bg-[#282828] text-amber-50 rounded-bl-none'" 
              class="inline-block px-4 py-2 rounded-2xl max-w-[85%] shadow-md whitespace-pre-wrap">
          {{ msg.text }}
        </span>
      </div>
      <div v-if="isLoading" class="text-left">
        <span class="inline-block px-4 py-2 rounded-2xl bg-[#282828] text-amber-50 text-xs italic rounded-bl-none animate-pulse">
          Mikir dulu bentar...
        </span>
      </div>
    </div>

    <!-- Area Ketik -->
    <div class="p-3 bg-[#1e1e1f] border-t border-[#383838] flex gap-2">
      <input v-model="userInput" @keyup.enter="sendMessage" type="text" 
             placeholder="Tanya soal Nando..." 
             class="w-full bg-[#121212] text-white border border-[#383838] rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-amber-200 transition" />
      <button @click="sendMessage" :disabled="isLoading" 
              class="bg-amber-200 text-black px-4 py-2 rounded-xl font-medium hover:bg-amber-300 disabled:opacity-50 transition">
        &rarr;
      </button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AiChat',
  data() {
    return {
      isOpen: false,
      userInput: '',
      messages: [
        { sender: 'ai', text: 'Halo! Aku asisten virtualnya Nando. Ada yang mau kamu tanyain soal pengalaman atau skill Nando?' }
      ],
      isLoading: false
    };
  },
  methods: {
    async sendMessage() {
      if (!this.userInput.trim()) return;

      const userText = this.userInput;
      this.messages.push({ sender: 'user', text: userText });
      this.userInput = '';
      this.isLoading = true;

      try {
        const response = await axios.post('http://localhost:3000/api/chat', {
          message: userText
        });
        
        this.messages.push({ sender: 'ai', text: response.data.reply });
      } catch (error) {
        this.messages.push({ sender: 'ai', text: 'Waduh, koneksi ke otak AI-ku terputus. Coba lagi ya!' });
      } finally {
        this.isLoading = false;
      }
    }
  }
}
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.fade-zoom-in {
  animation: fadeZoomIn 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
}
@keyframes fadeZoomIn {
  0% { opacity: 0; transform: scale(0.9) translateY(20px); }
  100% { opacity: 1; transform: scale(1) translateY(0); }
}
</style>