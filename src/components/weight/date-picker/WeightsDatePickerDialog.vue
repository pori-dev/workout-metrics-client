<template>
  <app-dialog>
    <template #dialogTitle>
      {{ formattedSelectedDate }}
    </template>

    <template #dialogBody>
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model.trim="weight"
            autofocus
            label="Weight"
            placeholder="80.9"
            @blur="$v.weight.$touch()"
            messages="A number with maximum 1 decimal point. like: 80 or 80.3"
            :error-messages="errors"
          >
          </v-text-field>
        </v-col>
        <v-col cols="12">
          <div class="d-flex justify-end">
            <v-btn
              v-if="!isWeightItemPresent"
              @click="dialogActionHandler('create')"
              color="primary"
              class="ml-2"
              :disabled="isDisabled"
              >Submit</v-btn
            >
            <template v-if="isWeightItemPresent">
              <v-btn
                @click="dialogActionHandler('update')"
                color="secondary"
                class="ml-2"
                :disabled="isEditDisabled"
                >Edit</v-btn
              >
              <v-btn
                @click="dialogActionHandler('delete')"
                dark
                color="red"
                class="ml-2"
                >Delete</v-btn
              >
            </template>
          </div>
        </v-col>
      </v-row>
    </template>
  </app-dialog>
</template>

<script>
import { format, parseISO } from 'date-fns';
import { required, decimal } from 'vuelidate/lib/validators';
import { validationMixin } from 'vuelidate';
import AppDialog from '@/components/common/AppDialog.vue';

export default {
  components: {
    AppDialog,
  },
  props: {
    dialog: {
      default: false,
      type: Boolean,
    },

    selectedWeightItem: {
      default: () => ({}),
      type: Object,
    },
  },

  data() {
    return {
      weight: this.selectedWeightItem['weight'],
    };
  },

  mixins: [validationMixin],

  validations: {
    weight: {
      required,
      decimal,
    },
  },

  computed: {
    isEditDisabled() {
      return this.isDisabled || !this.isWeightChanged;
    },

    isWeightChanged() {
      return this.selectedWeightItem.weight !== +this.weight;
    },

    parsedSelectedDate() {
      return parseISO(this.selectedWeightItem.date);
    },

    formattedSelectedDate() {
      return format(this.parsedSelectedDate, 'EE MMM d');
    },

    isWeightItemPresent() {
      return this.selectedWeightItem.id;
    },

    isDisabled() {
      return this.$v.$dirty && this.$v.$error;
    },

    errors() {
      const errors = [];
      if (!this.$v.weight.$dirty) return errors;
      if (!this.$v.weight.required) errors.push('A value is required');
      if (!this.$v.weight.decimal)
        errors.push('Weight must be number. Like: 80 or 80.3');
      return errors;
    },
  },

  methods: {
    dialogActionHandler(actionType) {
      this.$v.weight.$touch();
      // user should be able to delete an item even
      // the input value for weight is not valid
      if (this.$v.$invalid && actionType !== 'delete') return;
      this.$emit(actionType, this.weight);
      this.$store.commit('dialog/hideDialog');
    },
  },
};
</script>
