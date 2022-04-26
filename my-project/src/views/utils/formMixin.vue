<script>
export default {
  data () {
    return {
      name: 'mixin'
    }
  },
  mounted () {
    console.log('mixin')
  },
  methods: {
    speak () {
      console.log('mixin method')
    }
  }
}
</script>
