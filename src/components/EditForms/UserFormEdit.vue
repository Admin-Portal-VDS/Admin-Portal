<template>
  <div class="edit-form-header" data-id="edit-form-header">
    <h3 class="add-users">Edit User</h3>
    <div class="buttons">
      <CancelButton buttonName="Close" @click="goBack" class="close-button" />
      <button @click="handleForm" class="save-button" type="submit">
        Save
      </button>
    </div>
  </div>
  <div class="user-form-container">
    <div class="basic-info">
      <form>
        <div class="input-group">
          <label for="firstName"></label>
          <Field
            id="firstName"
            name="firstName"
            type="text"
            placeholder="First Name*"
            class="basic-field-info"
          />
          <ErrorMessage name="firstName" class="err-msg" />
        </div>

        <div class="input-group">
          <label for="lastName"></label>
          <Field
            id="lastName"
            name="lastName"
            type="text"
            placeholder="Last Name*"
            class="basic-field-info"
          />
          <ErrorMessage name="lastName" class="err-msg" />
        </div>

        <div class="input-group">
          <label for="userName"></label>
          <Field
            id="userName"
            name="userName"
            type="text"
            placeholder="User Name*"
            class="basic-field-info"
          />
          <ErrorMessage name="userName" class="err-msg" />
        </div>

        <div class="password-update">
          <label for="password"></label>
          <div class="password-container">
            <Field
              id="password"
              name="password"
              type="password"
              label="Password"
              placeholder="Password*"
              class="basic-field-info-password"
            />
            <button class="update-password">Update Password</button>
          </div>
          <ErrorMessage name="Password" class="err-msg" />
        </div>

        <div class="divider">
          <span></span>
        </div>

        <label for="email"></label>
        <Field
          id="email"
          name="email"
          type="email"
          label="Email*"
          placeholder="Email*"
          class="basic-field-info"
        />
        <ErrorMessage name="email" class="err-msg" />

        <label for="confirmEmail"></label>
        <Field
          id="confirmEmail"
          name="confirmEmail"
          type="email"
          label="Confirm Email*"
          placeholder="Confirm Email*"
          class="basic-field-info"
        />
        <ErrorMessage name="confirmEmail" class="err-msg" />

        <div class="form-group">
          <label for="groups"></label>
          <Field
            as="select"
            name="groups"
            data-id="groups"
            id="groups"
            class="select-group"
          >
            <option
              v-for="group in groups"
              :key="group.value"
              :value="group.value"
              :data-id="group.value"
            >
              {{ group.label }}
            </option>
          </Field>
          <ErrorMessage name="groups" class="err-msg" />
        </div>

        <div class="secret-question">
          <label for="secret-questions"></label>
          <Field
            as="select"
            name="secretQuestions"
            data-id="secret-questions"
            id="secret-questions"
            class="basic-field-info"
          >
            <option
              v-for="question in secretQuestions"
              :key="question.value"
              :value="question.value"
              :data-id="question.value"
            >
              {{ question.label }}
            </option>
          </Field>
          <ErrorMessage name="secretQuestions" class="err-msg" />
        </div>

        <label for="SecretAnswer"></label>
        <Field
          id="SecretAnswer"
          name="SecretAnswer"
          type="text"
          label=""
          placeholder="Enter New Secret Answer Here"
          class="basic-field-info"
        />
        <ErrorMessage name="SecretAnswer" class="err-msg" />

        <div class="divider">
          <span></span>
        </div>

        <div class="user-type">
          <Field
            as="select"
            name="userType"
            data-id="userType"
            id="userType"
            class="select-usertype"
          >
            <option
              v-for="option in userTypeOptions"
              :key="option.value"
              :value="option.value"
              :data-id="option.value"
            >
              {{ option.text }}
            </option>
          </Field>
        </div>
        <ErrorMessage name="userType" class="err-msg" />

        <div class="permissionSection">
          <div
            v-for="(label, key) in permissionFields"
            :key="key"
            class="form-group"
          >
            <label>
              <Field
                name="permissions"
                :value="key"
                type="checkbox"
                :data-id="`permission-${key}`"
                class="select-permission"
              />
              {{ label }}
            </label>
          </div>
          <ErrorMessage
            data-id="error-permissions"
            name="permissions"
            class="error-msg"
          />
        </div>

        <div class="divider">
          <span></span>
        </div>
      </form>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { Field, ErrorMessage, useForm } from 'vee-validate';
import * as yup from 'yup';
import { useToast } from 'vue-toastification';
import CancelButton from '@/components/common/CancelButton.vue';
import { useRouter } from 'vue-router';

// const firstName=ref('');
// const lastName=ref('');
// const userName=ref('');
// const email=ref('');
// const confirmEmail=ref('');
// const password=ref('');
// const secretAnswer=ref('');
const router = useRouter();

const goBack = () => {
  router.back();
};

const handleEvent = (event) => {
  if (event.key === 'Escape') {
    router.back();
  }
};

onMounted(() => {
  window.addEventListener('keydown', handleEvent);
});

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleEvent);
});

const toast = useToast();

const groups = ref([
  { value: '', label: 'Select Group' },
  { value: 'group1', label: 'Group 1' },
  { value: 'group2', label: 'Group 2' },
  { value: 'group3', label: 'Group 3' },
]);

const secretQuestions = ref([
  { value: '', label: 'Secret Question*' },
  { value: 'first_school', label: "What is your pet's name?" },
  { value: 'favorite_teacher', label: 'What is your favorite past-time?' },
  { value: 'favorite_food', label: 'What is your favorite food?' },
  { value: 'dream_job', label: 'What is the name of your first school?' },
  { value: 'best_friend', label: 'Who was your childhood hero?' },
  { value: 'car_model', label: "What is your mother's maiden name?" },
]);

const permissionFields = ref({
  serviceAnnouncements: 'Update this user with important service announcements',
  webAccess: 'Allow web and mobile app access',
  manageCallerId:
    'Allow this user to set and block the Outbound Caller ID for their extension(s)',
  manageCallBlocking:
    'Allow this user to manage Call Blocking for their extension(s)',
});

const userTypeOptions = ref([
  { value: '', text: 'Select User Type' },
  { value: 'accountAdmin', text: 'V Account Administrator' },
  { value: 'billingAdmin', text: 'Billing Admin' },
  { value: 'callQueuesAdmin', text: 'Call Queues Admin' },
  {
    value: 'callQueuesReportingAdmin',
    text: 'Call Queues Reporting Admin',
  },
  { value: 'endUser', text: 'End User' },
  { value: 'endUserNoDashboard', text: 'End User No Dashboard' },
  { value: 'reportsAdmin', text: 'Reports Admin' },
  { value: 'usersAdmin', text: 'Users Admin' },
]);

const validationSchema = yup.object({
  firstName: yup
    .string()
    .required('First name is required')
    .matches(/^[A-Za-z]+$/, 'Only letters allowed'),
  lastName: yup
    .string()
    .required('Last name is required')
    .matches(/^[A-Za-z]+$/, 'Only letters allowed'),
  userName: yup
    .string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters'),
  email: yup
    .string()
    .required('Email is required')
    .email('Invalid email format'),
  confirmEmail: yup
    .string()
    .required('Confirm Email is required')
    .oneOf([yup.ref('email')], 'Emails must match'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(/[\W]/, 'Password must contain at least one special character'),
  secretAnswer: yup
    .string()
    .required('Secret answer is required')
    .min(3, 'Answer must be at least 3 characters'),
  groups: yup.string().required('Group selection is required'),
  secretQuestions: yup.string().required('Please select a secret question'),
  userType: yup.string().required('Please select a user type'),
  permissions: yup.array().min(1, 'Please select at least one permission'),
});

const {
  handleSubmit,
  //values,
} = useForm({
  validationSchema,
});
const handleForm = handleSubmit((values) => {
  console.log(values);
  toast.success('User Details updated successfully!', {
    position: 'top-right',
    timeout: 3000,
  });
});
</script>
<style scoped>
body {
  background-color: #f5f5f5;
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.edit-form-header {
  width: 100vw;
  height: 35px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  left: 0;
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
}

.add-users {
  font-size: 15px;
  margin-left: 22px;
  color: black;
  font-weight: bold;
  margin-bottom: 20px;
}

.user-form-container {
  position: relative;
  top: 10px;
  max-width: 800px;
  width: 100%;
  padding: 20px;
  margin-left: 400px;
  margin-top: 45px;
  position: relative;
}

.buttons {
  display: flex;
  gap: 10px;
  margin-right: 30px;
}
.close-button {
  margin-top: 20px;
}
.save-button {
  background-color: #8e3dc7;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 14px;
  height: 40px;
  font-size: 13px;
  font-weight: bold;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
}

.basic-info {
  margin-bottom: 30px;
}
.basic-field-info {
  width: 400px;
  height: 40px;
  color: black;
  border: 1px solid rgba(9, 8, 8, 0.64);
  border-radius: 4px;
  margin: 8px;
}
.form-group {
  margin-left: 10px;
}
.err-msg {
  color: red;
  font-size: 0.9rem;
  margin-top: 5px;
  display: block;
  margin-left: 10px;
}
.input-group {
  display: flex;
  flex-direction: column; /* Stack label, input, and error message vertically */
  margin-bottom: 15px; /* Adds spacing between input fields */
}
.select-group {
  height: 45px;
  width: 180px;
  margin-top: 10px;
  border: 1px solid rgba(9, 8, 8, 0.64);
  border-radius: 4px;
}
.select-secret-question {
  height: 45px;
  width: 180px;
  margin-top: 10px;
}
.password-update {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  margin: 10px 0;
  max-width: 400px;
}
.basic-field-info-password {
  width: 195px;
  height: 40px;
  color: black;
  border: 1px solid rgba(9, 8, 8, 0.64);
  border-radius: 4px;
  margin-top: 10px;
}
.update-password {
  width: 195px;
  height: 42px;
  color: black;
  border: 1.5px solid rgba(12, 12, 12, 0.64);
  border-radius: 4px;
  margin-top: 10px;
  font-weight: bold;
}
.password-container {
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 400px;
  gap: 20px;
}

.user-type {
  margin-top: 25px;
  margin-bottom: 20px;
  width: 80px;
  margin-left: 10px;
}
.select-usertype {
  width: 195px;
  height: 40px;
  color: black;
  border: 1px solid rgba(9, 8, 8, 0.64);
  border-radius: 4px;
  margin-top: 10px;
}
.permissionSection {
  margin-right: 15px;
}
.select-permission {
  margin: 10px;
}
.divider {
  width: 400px;
  height: 1px;
  background: #5e5d5d;
  margin: 20px auto;
  display: flex;
  align-items: center;
  margin: 20px 10px;
  color: #888;
}
.divider::before,
.divider::after {
  content: '';
  flex: 0.25;
  height: 1px;
  background: #5e5d5d;
  margin: 0 0px;
}
</style>
