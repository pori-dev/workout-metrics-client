<template>
  <v-navigation-drawer v-model="$store.state.drawer" app>
    <v-list dark color="primary">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">Workout Tracker</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-list>
      <v-list-item-group color="primary">
        <v-list-item
          v-for="(item, index) in navItems"
          :key="index"
          :to="item.href"
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import {
  mdiChartTimelineVariantShimmer,
  mdiCalendar,
  mdiAccount,
  mdiHomeVariant,
} from '@mdi/js';

export default {
  data() {
    return {
      navItems: [
        {
          title: 'Home',
          href: '/',
          icon: mdiHomeVariant,
        },
        {
          title: 'Workout Schedule',
          href: '/schedule',
          icon: mdiCalendar,
        },
        {
          title: 'Weight',
          href: 'weight',
          icon: mdiChartTimelineVariantShimmer,
        },
        {
          title: 'Profile',
          href: 'profile',
          icon: mdiAccount,
        },
      ],
    };
  },
};
</script>

<style></style>
