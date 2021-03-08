import { addMonths, addYears, addWeeks } from 'date-fns';
import { RepositoryFactory } from '@/repositories/repository-factory';

const schedulesRepository = RepositoryFactory.get('schedules');

const PERIODS = {
  0: '1W',
  1: '1M',
  2: '3M',
  3: '6M',
  4: '1Y',
};

export default {
  namespaced: true,

  state: () => ({
    selectedWeekdays: [],
    selectedPeriod: null,
    showDialog: false,
    refetchSchedule: false,
  }),

  mutations: {
    setSelectedWeekdays(state, payload) {
      state.selectedWeekdays = payload;
    },

    setSelectedPeriod(state, payload) {
      state.selectedPeriod = payload;
    },

    setShowDialog(state, payload) {
      state.showDialog = payload;
    },

    setRefetchSchedule(state, payload) {
      state.refetchSchedule = payload;
    },
  },

  actions: {
    generateSchedule({ state, commit }) {
      const date = createDate(state.selectedPeriod);
      schedulesRepository
        .createToDos(date, state.selectedWeekdays)
        .then(() => {
          commit('setRefetchSchedule', true);

          this.commit('snackbar/showSnackbar', {
            text: 'Todo schedules added successfully',
            visible: true,
          });
        })
        .catch(() => {});
    },
  },
};

function createDate(period) {
  let date = null;
  const currentDate = new Date();
  const [timeRangeInt, timeRangeType] = PERIODS[period].split('');

  if (timeRangeType.includes('W')) {
    date = addWeeks(currentDate, timeRangeInt);
  }

  if (timeRangeType.includes('M')) {
    date = addMonths(currentDate, timeRangeInt);
  }

  if (timeRangeType.includes('Y')) {
    date = addYears(currentDate, timeRangeInt);
  }

  return date;
}
