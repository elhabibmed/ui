import Ember from 'ember';
import Sortable from 'ui/mixins/sortable';
import C from 'ui/utils/constants';

export default Ember.Controller.extend(Sortable, {
  environments: Ember.inject.controller(),
  projects: Ember.inject.service(),
  sortableContent: Ember.computed.alias('filteredStacks'),
  prefs: Ember.inject.service(),

  which: Ember.computed.alias('environments.which'),
  showAddtlInfo: false,
  selectedService: null,

  actions: {
    showAddtlInfo: function(service) {
      this.set('selectedService', service);
      this.set('showAddtlInfo', true);
    },
    dismiss: function() {
      this.set('showAddtlInfo', false);
      this.set('selectedService', null);
    },
    sortResults: function(name) {
      this.get('prefs').set(C.PREFS.SORT_STACKS_BY, name);
      this.send('setSort', name);
    }
  },

  setup: function() {
    var sort = this.get(`prefs.${C.PREFS.SORT_STACKS_BY}`);
    if (sort && sort !== this.get('sortBy')) {
      this.set('sortBy', sort);
    }
  }.on('init'),

  filteredStacks: function() {
    var which = this.get('which');
    var all = this.get('model');

    if ( which === C.EXTERNALID.KIND_ALL )
    {
      return all;
    }
    else
    {
      return all.filterBy('grouping', which);
    }
  }.property('model.[]','which'),


  sortBy: 'state',
  sorts: {
    state: ['stateSort','name','id'],
    name: ['name','id']
  },

});
