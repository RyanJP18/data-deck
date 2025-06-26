<script setup lang="ts">
export interface ComponentProps {
    headers: string[];
    data: string[][];
};

withDefaults(defineProps<ComponentProps>(), {
});
</script>


<template>
    <div>
        <div v-for="(card, cardIndex) in data" :key="cardIndex">
            <div v-for="(value, index) in card" :key="value">{{ headers[index] }}: {{ value }}</div>
        </div>
    </div>
</template>