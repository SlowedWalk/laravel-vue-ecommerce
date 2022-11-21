<template>
    <guest-layout title="Sign in to your account">
        <form class="mt-8 space-y-6" method="POST" @submit.prevent="login">
            <div v-if="errorMsg" class="flex items-center justify-between py-3 px-5 bg-red-500 text-white rounded">
                {{ errorMsg }}
                <span
                    class="w-8 h-8 flex items-center justify-center rounded-full transition-colors cursor-pointer hover:bg-[rgba(0,0,0,0.2)]"
                    @click="errorMsg = ''"
                >
                    <svg
                        class="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                          d="M6 18L18 6M6 6l12 12"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                      />
                    </svg>
                  </span>

            </div>
            <input name="remember" type="hidden" value="true"/>
            <div class="-space-y-px rounded-md shadow-sm">
                <div>
                    <label class="sr-only" for="email-address">Email address</label>
                    <input id="email-address"
                           v-model="user.email"
                           autocomplete="email"
                           class="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                           name="email"
                           placeholder="Email address"
                           required=""
                           type="email"/>
                </div>
                <div>
                    <label class="sr-only" for="password">Password</label>
                    <input id="password"
                           v-model="user.password"
                           autocomplete="current-password"
                           class="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                           name="password"
                           placeholder="Password"
                           required=""
                           type="password"/>
                </div>
            </div>

            <div class="flex items-center justify-between">
                <div class="flex items-center">
                    <input id="remember-me" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" name="remember-me"
                           type="checkbox"/>
                    <label class="ml-2 block text-sm text-gray-900" for="remember-me">Remember me</label>
                </div>

                <div class="text-sm">
                    <router-link :to="{ name: 'forgot-password' }"
                                 class="font-medium text-indigo-600 hover:text-indigo-500">Forgot your password?
                    </router-link>
                </div>
            </div>

            <div>
                <button :class="{ 'cursor-not-allowed': loading, 'hover:bg-indigo-500': loading, }"
                        :disabled="loading"
                        class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        type="submit"
                >
                    <svg
                        v-if="loading"
                        class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle
                            class="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            stroke-width="4"
                        ></circle>
                        <path
                            class="opacity-75"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            fill="currentColor"
                        ></path>
                    </svg>
                    <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                            <LockClosedIcon aria-hidden="true"
                                            class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"/>
                        </span>
                    Sign in
                </button>
            </div>
        </form>
    </guest-layout>
</template>

<script setup>
import {ref} from 'vue';
import {LockClosedIcon} from '@heroicons/vue/20/solid';
import GuestLayout from '../Layouts/GuestLayout.vue';
import store from "../../store";
import router from "../../router";

let loading = ref(false);
let errorMsg = ref("");

const user = {
    email: '',
    password: '',
    remember: false
}

function login() {
    loading.value = true;
    store.dispatch('login', user)
        .then(() => {
            loading.value = false;
            router.push({name: 'app.dashboard'})
        })
        .catch(({response}) => {
            loading.value = false;
            errorMsg.value = response.data.message;
        })
}
</script>

<script>
export default {
    name: "Login"
}
</script>

<style scoped>

</style>

