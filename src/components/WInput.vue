<template>
  <div 
    class="w-input-wrapper" 
    :class="[`w-input-${shape}`]"
    :style="{ width }"
  >
    <!-- 左侧图标插槽 -->
    <span 
        v-if="$slots.prefix || showSearchIcon" 
        class="w-input-prefix">
      <slot name="prefix">
        <!-- 默认搜索图标 -->
        <svg 
          v-if="showSearchIcon" 
          class="search-icon" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
      </slot>
    </span>

    <!-- 输入框 -->
    <input
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      class="w-input"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
      @keyup.enter="handleEnter"
    />

    <!-- 右侧清除按钮 -->
    <span 
      v-if="clearable && modelValue && !disabled" 
      class="w-input-clear"
      @click="handleClear"
    >
      <svg 
        class="clear-icon" 
        viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <circle cx="12" cy="12" r="10" />
        <path d="m15 9-6 6m0-6 6 6" />
      </svg>
    </span>
  </div>
</template>

<script setup lang="ts">
/**
 * WInput 输入框组件
 * 
 * @component
 * @example
 * 基础用法:
 * <w-input v-model="value" placeholder="请输入内容" />
 * 
 * 带搜索图标:
 * <w-input v-model="value" show-search-icon placeholder="搜索..." />
 * 
 * 自定义左侧图标:
 * <w-input v-model="value">
 *   <template #prefix>
 *     <YourIcon />
 *   </template>
 * </w-input>
 */

interface Props {
  /** 输入框绑定值 */
  modelValue?: string
  /** 输入框类型 */
  type?: string
  /** 占位符文本 */
  placeholder?: string
  /** 是否禁用 */
  disabled?: boolean
  /** 是否只读 */
  readonly?: boolean
  /** 是否显示搜索图标 */
  showSearchIcon?: boolean
  /** 是否显示清除按钮 */
  clearable?: boolean
  /** 输入框形状: 'square' | 'round' */
  shape?: 'square' | 'round'
  /** 输入框宽度 */
  width?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  type: 'text',
  placeholder: '请输入内容',
  disabled: false,
  readonly: false,
  showSearchIcon: false,
  clearable: false,
  shape: 'square',
  width: '100%'
})

interface Emits {
  /** 输入值变化时触发 */
  (e: 'update:modelValue', value: string): void
  /** 输入框获得焦点时触发 */
  (e: 'focus', event: FocusEvent): void
  /** 输入框失去焦点时触发 */
  (e: 'blur', event: FocusEvent): void
  /** 按下回车键时触发 */
  (e: 'enter', value: string): void
  /** 点击清除按钮时触发 */
  (e: 'clear'): void
}

const emit = defineEmits<Emits>()

/** 处理输入事件 */
const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}

/** 处理获得焦点事件 */
const handleFocus = (event: FocusEvent) => {
  emit('focus', event)
}

/** 处理失去焦点事件 */
const handleBlur = (event: FocusEvent) => {
  emit('blur', event)
}

/** 处理回车键事件 */
const handleEnter = () => {
  emit('enter', props.modelValue)
}

/** 处理清除按钮点击 */
const handleClear = () => {
  emit('update:modelValue', '')
  emit('clear')
}
</script>

<style scoped>
.w-input-wrapper {
  position: relative;
  display: inline-flex;
  align-items: center;
  border: 1px solid #dcdfe6;
  background-color: #fff;
  transition: border-color 0.2s;
}

/* 方形样式 */
.w-input-square {
  border-radius: 4px;
}

/* 圆形样式 */
.w-input-round {
  border-radius: 12px;
}

.w-input-wrapper:hover {
  border-color: #c0c4cc;
}

.w-input-wrapper:focus-within {
  border-color: #51aaef;
}

.w-input {
  flex: 1;
  width: 100%;
  padding: 8px 12px;
  border: none;
  outline: none;
  background-color: transparent;
  font-size: 14px;
  color: #606266;
}

.w-input::placeholder {
  color: #c0c4cc;
}

.w-input:disabled {
  cursor: not-allowed;
  color: #c0c4cc;
  background-color: #f5f7fa;
}

.w-input-prefix {
  display: flex;
  align-items: center;
  padding-left: 12px;
  color: #909399;
}

.search-icon,
.clear-icon {
  width: 16px;
  height: 16px;
  stroke-width: 2;
}

.w-input-clear {
  display: flex;
  align-items: center;
  padding-right: 12px;
  color: #c0c4cc;
  cursor: pointer;
  transition: color 0.2s;
}

.w-input-clear:hover {
  color: #909399;
}
</style>
