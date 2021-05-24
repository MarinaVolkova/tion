<template>
<div class="table tableinfo">

  <table class="table table-striped table-hover">
  <thead>
   <tr>
      <th scope="col">#</th>
      <th scope="col">First</th>
      <th scope="col">Last</th>
      <th scope="col">Handle</th>
    </tr>
  </thead>
  <tbody>
<tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <th scope="row">ИТОГО</th>
      <td><input type="checkbox" name="a" value="1417"></td>
      <td><input type="checkbox" name="a" value="1417"></td>
      <td><input type="checkbox" name="a" value="1417"></td>
    </tr>
  </tfoot>
</table>
</div>
</template>
<script>
import Tablebottom from './Tablebottom'
export default{
  computed: {
    Layout(){
      return 'layoyt'
    }
  },
  components: {
    Tablebottom
  }
}
</script>