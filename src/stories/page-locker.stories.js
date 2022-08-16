import { PageLocker } from "../components/page-locker";

export default {
  title: "Page Locker",
  component: PageLocker,
};

const PageLockerStory = ({ ...args }) => (
  <PageLocker {...args}>
    <div>YOU DID IT!</div>
  </PageLocker>
);

export const Normal = PageLockerStory.bind({});
Normal.args = {
  pass: "12345",
};
