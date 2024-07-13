<template>
  <FormKit type="form">
    <FormKit type="group">
      <FormKit
        name="type"
        type="select"
        label="Type"
        :options="['string', 'number', 'boolean']"
      />
      <FormKit name="name" type="text" label="Name" />
    </FormKit>
  </FormKit>
</template>
