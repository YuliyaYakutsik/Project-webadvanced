import prepareSend from './prepareSend';

const formBlog = document.querySelector('#blog');

formBlog.addEventListener('submit', prepareSendPost());

function prepareSendPost(e) {
  e.preventDefault();
  let data = {
    title: formBlog.title.value,
    date: formBlog.date.value,
    text: formBlog.text.value
  };
  prepareSend('/admin', formBlog, data);
}